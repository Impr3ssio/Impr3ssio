app.get('/cart', ensureAuthenticated, async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user._id });
      const cartItems = cart ? cart.items : [];
      const totalPrice = cart ? cart.totalPrice : 0;
      res.render('cart', { cartItems, totalPrice, user: req.user, messages: req.flash() });
    } catch (error) {
      console.error('Error fetching cart:', error);
      req.flash('error', 'Error fetching cart. Please try again.');
      res.redirect('/');
    }
  });