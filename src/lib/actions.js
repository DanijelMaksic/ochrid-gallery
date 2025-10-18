'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import {
   addressFormSchema,
   orderFormSchema,
   reviewFormSchema,
} from '@/src/lib/schema';
import { supabase } from '@/src/lib/supabase';
import { signIn, signOut } from '@/src/lib/auth';
import { placeOrder, removeQuantity } from '@/src/lib/data-service';

export async function signInAction() {
   await signIn('google', {
      redirectTo: '/account',
   });
}

export async function signOutAction(previousState) {
   await signOut({ redirectTo: '/' });
}

// -----------------------------------------------
// ================== WISHLIST ===================
// -----------------------------------------------

export async function addToWishlist(userId, itemId) {
   const { error } = await supabase
      .from('wishlists')
      .upsert([{ user_id: userId, item_id: itemId }], {
         onConflict: ['user_id', 'item_id'],
      });

   if (error) {
      throw new Error('Item could not be wishlisted');
   }

   revalidatePath(`/items/${itemId}`);
}

export async function removeFromWishlist(itemId, page) {
   const { error } = await supabase
      .from('wishlists')
      .delete()
      .eq('item_id', itemId);

   if (error) {
      throw new Error('Item could not be deleted from the wishlist');
   }

   if (page === 'wishlistPage') revalidatePath('/account/wishlist');
   if (page === 'itemPage') revalidatePath(`/items/${itemId}`);
}

// -----------------------------------------------
// ==================== ORDER ====================
// -----------------------------------------------

export async function createOrderAction(previousState, formData) {
   const id = Number(formData.get('id'));
   const country = formData.get('country');
   const email = formData.get('email');
   const cart = formData.get('cart');

   const data = {
      full_name: formData.get('full_name'),
      address: formData.get('address'),
      city: formData.get('city'),
      post_code: Number(formData.get('post_code')),
      phone: Number(formData.get('phone')),
   };

   const result = orderFormSchema.safeParse(data);

   if (!result.success) {
      return {
         success: false,
         errors: result.error.flatten().fieldErrors,
      };
   }

   return {
      ...result.data,
      country,
      id,
      email,
      cart,
      success: true,
   };
}

export async function placeOrderAction(newOrderString) {
   placeOrder(newOrderString);
   removeQuantity(newOrderString);
   redirect('/review-order/thank-you');
}

// -----------------------------------------------
// ================== ADDRESS ====================
// -----------------------------------------------

export async function createAddressAction(previousState, formData) {
   const data = {
      billing_name: formData.get('full_name'),
      billing_address: formData.get('address'),
      billing_city: formData.get('city'),
      billing_post_code: Number(formData.get('post_code')),
      billing_phone: Number(formData.get('phone')),
   };

   const billing_country = formData.get('country');
   const result = addressFormSchema.safeParse(data);

   if (!result.success) {
      return {
         success: false,
         errors: result.error.flatten().fieldErrors,
      };
   }

   const billing_email = formData.get('email');
   const user_id = formData.get('user_id');

   const { error } = await supabase
      .from('address-book')
      .insert([
         {
            ...result.data,
            billing_country,
            billing_email,
            user_id,
         },
      ])
      .select();

   if (error) {
      throw new Error('Address could not be created');
   }

   revalidatePath('/account/address-book');
   return { success: true };
}

export async function editAddressAction(previousState, formData) {
   const data = {
      billing_name: formData.get('full_name'),
      billing_address: formData.get('address'),
      billing_city: formData.get('city'),
      billing_post_code: Number(formData.get('post_code')),
      billing_phone: Number(formData.get('phone')),
   };

   const billing_country = formData.get('country');
   const result = addressFormSchema.safeParse(data);

   if (!result.success) {
      return {
         success: false,
         errors: result.error.flatten().fieldErrors,
      };
   }

   const address_id = Number(formData.get('id'));

   const { error } = await supabase
      .from('address-book')
      .update({ ...result.data, billing_country })
      .eq('id', address_id)
      .select();

   if (error) {
      throw new Error('Address could not be edited');
   }

   revalidatePath('/account/address-book');
   return { success: true };
}

export async function deleteAddressAction(id) {
   const { error } = await supabase.from('address-book').delete().eq('id', id);

   if (error) {
      throw new Error('Address could not be deleted');
   }

   revalidatePath('/account/address-book');
}

// -----------------------------------------------
// =================== REVIEW ====================
// -----------------------------------------------

export async function createReviewAction(previousState, formData) {
   const data = {
      username: formData.get('username'),
      title: formData.get('title'),
      content: formData.get('content'),
      recommended: formData.get('recommended') === 'true' ? true : false,
   };

   const result = reviewFormSchema.safeParse(data);

   if (!result.success) {
      return {
         success: false,
         errors: result.error.flatten().fieldErrors,
      };
   }

   // Non user input data
   const user_id = formData.get('user_id');
   const item_id = formData.get('item_id');

   const { error } = await supabase
      .from('reviews')
      .insert([
         {
            ...result.data,
            user_id,
            item_id,
            likes: 0,
            dislikes: 0,
         },
      ])
      .select();

   if (error) {
      throw new Error('Review could not be created');
   }

   revalidatePath(`/items/${item_id}`);
   return { success: true };
}

export async function editReviewAction(previousState, formData) {
   const data = {
      username: formData.get('username'),
      title: formData.get('title'),
      content: formData.get('content'),
      recommended: formData.get('recommended') === 'true' ? true : false,
   };

   const result = reviewFormSchema.safeParse(data);

   if (!result.success) {
      return {
         success: false,
         errors: result.error.flatten().fieldErrors,
      };
   }

   // For finding the review ROW in Supabase
   const id = formData.get('id');

   // For revalidating PATH
   const item_id = formData.get('item_id');

   const { error } = await supabase
      .from('reviews')
      .update(result.data)
      .eq('id', id)
      .select();

   if (error) {
      throw new Error('Review could not be edited');
   }

   revalidatePath('/account/reviews');
   revalidatePath(`/items/${item_id}`);
   return { success: true };
}

export async function deleteReviewAction(id) {
   const { error } = await supabase.from('reviews').delete().eq('id', id);

   if (error) {
      throw new Error('Review could not be deleted');
   }

   revalidatePath('/account/reviews');
}

// -----------------------------------------------
// =============== LIKE AND DISLIKE ==============
// -----------------------------------------------

export async function likeAction(review_id, item_id, session, likeCount) {
   if (!session) return;

   const { error } = await supabase
      .from('reviews')
      .update({ likes: likeCount })
      .eq('id', review_id);

   if (error) {
      throw new Error('Likes could not be updated');
   }

   revalidatePath(`/items/${item_id}`);
}

export async function dislikeAction(review_id, item_id, session, dislikeCount) {
   if (!session) return;

   const { error } = await supabase
      .from('reviews')
      .update({ dislikes: dislikeCount })
      .eq('id', review_id)
      .select();

   if (error) {
      throw new Error('Dislikes could not be updated');
   }
   revalidatePath(`/items/${item_id}`);
}
