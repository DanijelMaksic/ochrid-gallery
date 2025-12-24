# Ochrid Gallery E-Commerce

Ochrid Gallery is a web store that enables its users to browse and order icons. The website is powered by Next.js, which provides fast initial load time and server-side rendering. It is styled with Tailwind and can be used on a variety of devices thanks to the responsive design. The app's data is stored in the Supabase database.

You can check out the [live demo](https://ochrid-gallery.vercel.app/).

Installation:

```
npm i
npm run dev
```
<br />

## Landing page

Upon entering the website, user will first see the gallery's landing page. Some general information about the business is outlined here.

![landing page](https://danijelmaksic.vercel.app/assets/store-0-Vd7B771X.webp)

<br />

## Icons page

On the icons page, users can browse various icons, which can be sorted and filtered based on user's preferences.

![icons page](https://danijelmaksic.vercel.app/assets/store-1-B6JJLEYw.webp)

<br />

## Icons details

Each icon has its own page with some more details and features, where user can add an icon to cart, wishlist and review it.

![icons details page](https://danijelmaksic.vercel.app/assets/store-2-Bof0He1n.webp)

<br />

## Checkout process

After one or more icons have been added to cart, user can visit the "Shopping cart" page. This page contains cart management, a summary of the order and some featured popular products. Here user can start the checkout process, but in order to proceed to the next part, user needs to register/log in using their Google profile.

![cart page](https://danijelmaksic.vercel.app/assets/store-3-C9i1asFL.webp)

<br />

After logging in, user can continue to the "Billing information" page. Here user can choose an address from their address book or use some other address. Input validation is handled by Zod library.

![billing info page](https://danijelmaksic.vercel.app/assets/store-4-DRhh9RZY.webp)

<br />

Next is the "Payment method" page, where one of two methods can be chosen. Here, user can also leave an optional note if something about the order needs to be clarified.

![payment method page](https://danijelmaksic.vercel.app/assets/store-5-DMLXSuyR.webp)

<br />

For the final part of the checkout, we have the "Review order" page, where user can review all the details about the order. After making sure everything is correct, user can place the order, which will be sent to the store's Content Management System (CMS) app for an employee to confirm it.

![review order page](https://danijelmaksic.vercel.app/assets/store-6-BPFns62N.webp)

<br />

## Account section

After registering/logging in, user can access the account management part of the website. By default, user will be greeted by the "Profile overview" page, which includes certain account activity statistics.

![profile overview page](https://danijelmaksic.vercel.app/assets/store-7-Bo5UloA8.webp)

<br />

Next up is the "Order history" page, where past (completed) orders can be inspected.


![order history page](https://danijelmaksic.vercel.app/assets/store-8-BhtvRp7y.webp)

<br />

Continuing, we come across the "Wishlist" page, where user's saved icons can be accessed.

![wishlist page](https://danijelmaksic.vercel.app/assets/store-9-mp3CXrI3.webp)

<br />

The following page showcases user's reviews. In order to review an icon, user first needs to be logged in and then buy it (more precisely, reviewing will be unlocked upon order confirmation and completion).

![user reviews page](https://danijelmaksic.vercel.app/assets/store-10-BFsn6YrU.webp)

<br />

Finally, we come to the "Address book" page, where user can save their addresses and choose their favorite one.


![address book page](https://danijelmaksic.vercel.app/assets/store-11-CrWzAkXU.webp)

<br />

## Credits

Special thanks to Jonas Schmedtmann, thanks to whom I learned a lot; his work was an inspiration for most of my projects. If you are new at learning web development check out his courses!

