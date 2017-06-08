const mongoose= require('mongoose');
mongoose.Promise=global.Promise; // mongoose will use the globla promise..this being node 7.6,  promise is async/await
const slug=require ('slugs');

const storeSchema= new mongoose.Schema({
  name: {
    type:String,
    trim:true,
    required: 'Please enter a store name'
  },
  slug: String,
  description:{
    type: String,
    trim: true
  },
  tags: [String]
});

storeSchema.pre('save',function (next){
  if(!this.isModified('name')){
    next(); //skip it
    return;  //stop this this function from running  ends function call
  }
  this.slug=slug(this.name);
  next();
  //TODO make more resilient so slugs are unique
});

module.exports= mongoose.model('Store',storeSchema);
