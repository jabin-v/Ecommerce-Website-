import './imageSlider.css';

import React, { useEffect, useRef, useState } from 'react'
import ImageBtn from '../imageBtns/ImageBtn';

const ImageSlider = ({singleProduct}) => {
    const ref = useRef(null);
     const [width, setWidth] = useState(null);


    // const [slideIndex,setSlideIndex]=useState(1)

    useEffect(()=>{
        setWidth(ref.current.offsetWidth);

    },[])

    
    console.log(width)
    console.log(window.innerWidth)

    useEffect(() => {
        function handleResize() {
            console.log("resize")
            setWidth(ref.current.offsetWidth);
        }

        handleResize();
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize',handleResize);
      }, []);

  
    const slideImage = (imgId) => {

        console.log("first")
        
       
        document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * width}px)`;
    }

   



  return (
    <div className="product-imgs">
    <div className="img-display">
      <div className="img-showcase" >
        {
          singleProduct?.images.map((img,index)=> <img src={img.url} alt="shoe image" key={index} ref={ref} />)
        }
      </div>
    </div>
    <div className="img-select">
    {
        singleProduct?.images.map((img,index)=>
        //return imags btns here
        <ImageBtn image={img.url} datakey={index+1}     key={index}  slideImage={slideImage}/>
     

        )
      }
      
    </div>
  </div>
  )
}

export default ImageSlider