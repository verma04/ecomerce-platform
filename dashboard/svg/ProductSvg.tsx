import React from "react";

const ProductSvg = () => {
  const svg = `<svg width="1.2rem" 
      height="1.2rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98.03 88.12"><defs><style>.cls-1{fill:#bd977c;}.cls-2{fill:#472b29;}.cls-3{fill:#ee3e54;}.cls-4{fill:#f6cca4;}.cls-5{fill:#fdfcee;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Introduction_icon" data-name="Introduction icon"><path class="cls-1" d="M92.64,21.1V76.81a9.86,9.86,0,0,1-9.72,9.94H15.07a9.86,9.86,0,0,1-9.72-9.94V21.1"/><path class="cls-2" d="M82.92,88.12H15.07A11.22,11.22,0,0,1,4,76.81V21.1H6.72V76.81a8.47,8.47,0,0,0,8.34,8.57H82.92a8.47,8.47,0,0,0,8.34-8.57V21.1H94V76.81A11.22,11.22,0,0,1,82.92,88.12Z"/><path class="cls-3" d="M72.09,27.84V40.42l4.44-3.7L81,40.42V27.84Z"/><path class="cls-2" d="M82.34,42.43,76.52,38l-5.94,4.42V27.47H82.34Zm-9.8-13v9.06l4-3,3.84,2.94v-9Z"/><path class="cls-4" d="M8.43,28C4.54,28,1.37,24.41,1.37,20V1.37H96.65V20c0,4.45-3.16,8.07-7.05,8.07H8.43Z"/><path class="cls-2" d="M95.28,2.74V20c0,3.69-2.55,6.7-5.68,6.7H8.43c-3.13,0-5.69-3-5.69-6.7V2.74H95.28M97.53,0H.81A.86.86,0,0,0,0,.9V20c0,5.2,3.79,9.45,8.43,9.45H89.6C94.23,29.41,98,25.16,98,20V.55a.53.53,0,0,0-.5-.55Z"/><path class="cls-2" d="M76.53,37a.48.48,0,0,1-.47-.48V28.69a.47.47,0,0,1,.94,0v7.84A.48.48,0,0,1,76.53,37Z"/><path class="cls-2" d="M80.4,37.33a.27.27,0,0,1-.17-.06l-3.59-3a.27.27,0,0,1,.34-.41l3.59,3a.26.26,0,0,1-.17.46Z"/><path class="cls-2" d="M80.4,34.64a.27.27,0,0,1-.17-.06l-3.59-3a.26.26,0,0,1,0-.37.27.27,0,0,1,.37,0l3.59,3a.27.27,0,0,1,0,.37A.25.25,0,0,1,80.4,34.64Z"/><path class="cls-2" d="M78.79,80.38H19.24a7.49,7.49,0,0,1-7.48-7.47V40.19a1,1,0,0,1,2,0V72.91a5.52,5.52,0,0,0,5.52,5.51H78.79a5.51,5.51,0,0,0,5.51-5.51V63.72a1,1,0,0,1,2,0v9.19A7.48,7.48,0,0,1,78.79,80.38Z"/><path class="cls-2" d="M80.85,32.54a.25.25,0,0,1-.16-.06l-3.59-3a.26.26,0,1,1,.33-.4l3.59,3a.27.27,0,0,1,0,.37A.27.27,0,0,1,80.85,32.54Z"/><path class="cls-2" d="M48,79.89a1,1,0,0,1-1-1V59.35a1,1,0,0,1,2,0V78.91A1,1,0,0,1,48,79.89Z"/><path class="cls-2" d="M48,40.17a1,1,0,0,1-1-1V33.8a1,1,0,0,1,2,0v5.39A1,1,0,0,1,48,40.17Z"/><path class="cls-2" d="M85.28,58.82a1,1,0,0,1-1-1V52a1,1,0,0,1,2,0v5.89A1,1,0,0,1,85.28,58.82Z"/><path class="cls-5" d="M56.9,48.28H37.7c-1.86,0-3.39-1.79-3.39-4h0c0-2.19,1.52-4,3.39-4H56.9c1.86,0,3.39,1.79,3.39,4h0C60.29,46.48,58.76,48.28,56.9,48.28Z"/><path class="cls-2" d="M56.53,49H38.23a4.9,4.9,0,0,1,0-9.8h18.3a4.9,4.9,0,0,1,0,9.8Zm-18.3-7.84a2.94,2.94,0,0,0,0,5.88h18.3a2.94,2.94,0,0,0,0-5.88Z"/><path class="cls-2" d="M24.51,69.6a1,1,0,0,1-1-1V56.86a1,1,0,0,1,2,0V68.62A1,1,0,0,1,24.51,69.6Zm16.66,3.92H19.61a1,1,0,1,1,0-2H41.17a1,1,0,1,1,0,2Zm-4.9-3.92a1,1,0,0,1-1-1V56.86a1,1,0,0,1,2,0V68.62A1,1,0,0,1,36.27,69.6Z"/><path class="cls-2" d="M24.51,52.93l-4.9,7.85h9.8Zm11.76,0-4.9,7.85h9.8Z"/></g></g></svg>`;
  return (
    <div
      style={{ marginTop: "0.5rem" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    ></div>
  );
};

export default ProductSvg;