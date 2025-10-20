import { notFound } from 'next/navigation';
import { supabase } from '@/src/lib/supabase';

export async function getItems() {
   const { data, error } = await supabase.from('items').select('*');

   if (error) {
      throw new Error('Items could not be fetched');
   }

   return data;
}

export async function getItem(slug) {
   const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('slug', slug)
      .single();

   if (error) {
      notFound();
   }

   return data;
}

export async function getPopularItems() {
   const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('sales', { ascending: false });

   if (error) {
      throw new Error('Items could not be fetched');
   }

   return data;
}

export async function getUser(email) {
   const { data, error } = await supabase
      .from('website-users')
      .select(
         '*, reviews(*, items(slug, name, image)), address-book(*), archive(*)'
      )
      .eq('email', email)
      .single();

   if (error) {
      throw new Error('User could not be found');
   }

   return data;
}

export async function createUser(newUser) {
   const { data, error } = await supabase
      .from('website-users')
      .insert([newUser]);

   if (error) {
      throw new Error('User could not be created');
   }

   return data;
}

export async function getWishlist(id) {
   const { data, error } = await supabase
      .from('wishlists')
      .select('*, items(*)')
      .eq('user_id', id);

   if (error) {
      throw new Error('Wishlist could not be fetched');
   }

   return data;
}

export async function getWishlistDates(id) {
   const { data, error } = await supabase
      .from('wishlists')
      .select('created_at, item_id')
      .eq('user_id', id);

   if (error) {
      throw new Error('Wishlist date could not be fetched');
   }

   return data;
}

export async function getWishlistCount(id) {
   const { count, error } = await supabase
      .from('wishlists')
      .select('item_id', { count: 'exact', head: true })
      .eq('user_id', id);

   if (error) {
      throw new Error('Wishlist count could not be fetched');
   }

   return count || 0;
}

export async function isOnWishlist(userId, itemId) {
   const { data, error } = await supabase
      .from('wishlists')
      .select('item_id')
      .eq('user_id', userId)
      .eq('item_id', itemId)
      .single();

   if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows found
      throw new Error(error.message);
   }

   return !!data;
}

export async function getArchivedOrders() {
   const { data, error } = await supabase
      .from('archive')
      .select('*')
      .order('order_date', { ascending: false });

   if (error) {
      throw new Error('Archived orders could not be fetched');
   }

   return data;
}

export async function getArchivedOrderCount(email) {
   const { count, error } = await supabase
      .from('archive')
      .select('id', { count: 'exact', head: true })
      .eq('email', email);

   if (error) {
      throw new Error('Archived order count could not be fetched');
   }

   return count || 0;
}

export async function getAddressCount(email) {
   const { count, error } = await supabase
      .from('address-book')
      .select('id', { count: 'exact', head: true })
      .eq('billing_email', email);

   if (error) {
      throw new Error('Address count could not be fetched');
   }

   return count || 0;
}

export async function placeOrder(newOrderString) {
   const newOrder = JSON.parse(newOrderString.get('orderData'));

   const id = Number(newOrder.id);
   const full_name = newOrder.full_name;
   const address = newOrder.address;
   const city = newOrder.city;
   const post_code = Number(newOrder.post_code);
   const payment_method = newOrder.payment_method;
   const country = newOrder.country;
   const phone = Number(newOrder.phone);
   const email = newOrder.email;
   const note = newOrder.note;
   const cart = newOrder.cart;

   const { error } = await supabase
      .from('orders')
      .insert([
         {
            id,
            full_name,
            address,
            city,
            post_code,
            payment_method,
            country,
            phone,
            email,
            note,
            cart,
         },
      ])
      .select();

   if (error) {
      throw new Error('Order could not be placed');
   }
}

export async function removeQuantity(newOrderString) {
   const newOrder = JSON.parse(newOrderString.get('orderData'));

   const cart = JSON.parse(newOrder.cart);
   cart.map((cartItem) => removeQ(cartItem));
}

async function removeQ(cartItem) {
   const { data, error } = await supabase
      .from('items')
      .select('quantity')
      .eq('id', cartItem.itemId)
      .select();

   if (error) {
      throw new Error('Item could not be updated');
   }

   const newQuantity = data[0].quantity - cartItem.cartQuantity;
   const newInStock = newQuantity < 1 ? false : true;

   await supabase
      .from('items')
      .update({ quantity: newQuantity, in_stock: newInStock })
      .eq('id', cartItem.itemId);
}

export async function getCountries() {
   try {
      const res = await fetch('https://restcountries.com/v2/all?fields=name');
      const countries = await res.json();
      return countries;
   } catch {
      throw new Error('Could not fetch countries');
   }
}

export async function getReviews() {
   const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

   if (error) {
      throw new Error('Reviews could not be fetched');
   }

   return data;
}

export async function getReviewCount(userId) {
   const { count, error } = await supabase
      .from('reviews')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId);

   if (error) {
      throw new Error('Review count could not be fetched');
   }

   return count || 0;
}
