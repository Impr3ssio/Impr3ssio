app.post('/upload', ensureAuthenticated, upload.array('stlFiles'), async (req, res) => {
    const files = req.files;
    if (!files || files.length === 0) {
      req.flash('error', 'No files uploaded.');
      return res.redirect('/upload');
    }
  
    try {
      let cart = await Cart.findOne({ userId: req.user._id });
      if (!cart) {
        cart = new Cart({ userId: req.user._id, items: [], totalPrice: 0 });
      }
  
      for (const file of files) {
        const filePath = file.path;
        try {
          const volume = await calculateVolume(filePath); // Volume in mm³
          const price = volume * 0.00192; // Price in INR
  
          cart.items.push({ filename: file.originalname, volume, price });
          cart.totalPrice += price;
        } catch (error) {
          console.error(`Error processing file ${file.originalname}:`, error.message);
          req.flash('error', `Error processing file ${file.originalname}: ${error.message}`);
        }
      }
  
      await cart.save();
      res.redirect('/cart');
    } catch (error) {
      console.error('Error processing files:', error);
      req.flash('error', 'Error processing files. Please try again.');
      res.redirect('/upload');
    }
  });