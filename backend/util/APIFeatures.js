class APIFeatures{

    constructor(query,queryString){
      this.query=query;
      this.queryString=queryString
    }

    
    search() {
  //     let regex = new RegExp(value.searchQuery,'i');
  //  { $and: [ { $or: [{title: regex },{description: regex}] }, {category: value.category}, {city:value.city} ] }

     

        let regex = new RegExp(this.queryString.keyword,'i');
        const keyword = this.queryString.keyword
        ? { $or: [{name: regex },{description: regex},{activity:regex},{brand:regex},{colors:regex}] }
        : {};
  
      this.query = this.query.find({ ...keyword });
      return this;


      
     
      
    }
  
    filter(){
       //BUILD QUERY


      

       
  
       let queryObj={...this.queryString};

       if(queryObj.price)
       { queryObj.price=JSON.parse(queryObj.price)}

      if(queryObj.colors){
        queryObj.colors=JSON.parse(queryObj.colors)

      }
      if(queryObj.activity){
        queryObj.activity=JSON.parse(queryObj.activity)

      }
      if(queryObj.ratingsAverage){
        queryObj.ratingsAverage=JSON.parse(queryObj.ratingsAverage)

      }

  
  
       //FILTERING
       const excludedFields=["page","sort","limit","fields","keyword"];
   
       excludedFields.forEach(el=>delete queryObj[el])
   
       //ADVANCED FILTERING
       let queryStr=JSON.stringify(queryObj);
       
       
       queryStr=queryStr.replace(/\b(gte|gt|lte|lt|in)\b/g,match=>`$${match}`);

        
       
    
      this.query=this.query.find(JSON.parse(queryStr));
  
      return this;
  
    }
  
    sort(){
      
     
     if(this.queryString.sort){
  
      const sortBy=this.queryString.sort.split(',').join(' ');
       this.query=this.query.sort(sortBy);
       //in case there is tie sort('price ratingsAvg)
   }else{
    this.query=this.query.sort("-updatedAt")
   }
  
   return this;
    }
  
    limit(){
      if(this.queryString.fields){
        const fields=this.queryString.fields.split(',').join(' ');
    
        this.query=this.query.select(fields)
    
       }else{
        this.query=this.query.select("-__v")
       }
       return this;
    }
  
    paginate(){
      
      const page=this.queryString.page * 1 || 1 ;
      const limit=this.queryString.limit * 1 ||50 ;
      const skip=(page - 1 ) * limit
   
      this.query=this.query.skip(skip).limit(limit);
   
      return this;
   
      
  
    }
  }

  module.exports=APIFeatures;