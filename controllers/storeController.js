const mongoose=require('mongoose');
const Store=mongoose.model('Store');


exports.homepage= (req,res)=>res.render('index', {title: 'Welcome'});
exports.addStore=(req,res)=>res.render('editStore', { title: 'Add Store' });

exports.createStore= async (req,res)=>{
  const store= await (new Store(req.body)).save(); //i have to use const and await in the same line beacuause slug is only generated vie de save hook
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
  res.redirect(`/stores/${store.slug}`);
  // console.log('it worked');
};

exports.getStores= async(req,res)=>{
    // const stores= await Store.find();
    // /res.render('stores', { title: 'Stores',stores });
  res.render('stores', { title: 'Stores', stores: await Store.find()  });
};

exports.editStore = async (req,res)=>{
  //1 find the store given the ID
  const store = await Store.findOne({_id: req.params.id});

  //2.confirm they are the owner of the store
  //TODO
  //3  render out the edit form so the user can update thier store
   res.render('editStore',{ title: `Edit ${store.name}`,store: store })
};

exports.updateStore = async (req,res)=>{
//find and update the store
  const store= Store.findOneAndUpdate(
    { _id: req.params.id},
    req.body,
    {
    new:true, //will return the new store and not the old onw
    runValidators:true
   }
 )
  //redirect the to the store and tell them it worked
};
