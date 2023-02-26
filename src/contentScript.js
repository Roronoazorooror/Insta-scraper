import JSZip from "jszip";
const mediaArray=[]
var count=0
let mySpan ;
// function downloadMedia(mediaArray) {
//   const zip = new JSZip();
//   const CHUNK_SIZE = 50;
//   let chunkIndex = 0;

//   function processChunk() {
//     const chunkStart = chunkIndex * CHUNK_SIZE;
//     const chunkEnd = Math.min((chunkIndex + 1) * CHUNK_SIZE, mediaArray.length);

//     for (let i = chunkStart; i < chunkEnd; i++) {
//       const img = new Image();
//       img.crossOrigin = 'Anonymous';
//       img.onload = (function(i) {
//         return function() {
//           const canvas = document.createElement('canvas');
//           canvas.width = this.naturalWidth;
//           canvas.height = this.naturalHeight;
//           canvas.getContext('2d').drawImage(this, 0, 0);
//           const dataURL = canvas.toDataURL('image/png');
//           zip.file(`image_${i}.png`, dataURL.substr(dataURL.indexOf(',') + 1), { base64: true });
//           if (i === mediaArray.length - 1) {
//             zip.generateAsync({ type: 'blob' }).then(function (content) {
//               const url = window.URL.createObjectURL(content);
//               const a = document.createElement('a');
//               a.href = url;
//               a.download = 'images.zip';
//               a.click();
//               window.URL.revokeObjectURL(url);
//             });
//           }
//         }
//       })(i);
//       img.src = mediaArray[i].src;
//     }

//     chunkIndex++;
//     if (chunkIndex * CHUNK_SIZE < mediaArray.length) {
//       setTimeout(processChunk, 3000); // Process the next chunk after a delay
//     }
//   }

//   processChunk();
// }
function downloadMediaArray() {
  // Convert mediaArray to a JSON string
  const mediaArrayJSON = JSON.stringify(mediaArray, null, 2);

  // Create a blob object from the JSON string
  const blob = new Blob([mediaArrayJSON], { type: 'application/json' });

  // Create a download link element
  const downloadLink = document.createElement('a');
  downloadLink.download = 'mediaArray.json';
  downloadLink.textContent = 'Download Media Array';
  downloadLink.href = URL.createObjectURL(blob);

  // Trigger a click on the download link to initiate the download prompt
  downloadLink.click();
}

function copyMediaSrcToLocalStorage() {
  count++;
  if (mediaArray.length >= mySpan  ) {
    downloadMediaArray(mediaArray);
    return;
  }

  // Find all image elements on the page
  window.scrollTo(0, document.body.scrollHeight);
  const mainChild = document.querySelector("main").children[0].children[3];

  // Find all image elements in the main child
  const imageElements = document.querySelectorAll("img");

  // Loop through each element and copy its src attribute to mediaArray
  for (let i = 0; i < imageElements.length; i++) {
    const src = imageElements[i].getAttribute("src");
    if (src) {
      const mediaData = { src: src };
      const filter = mediaArray.findIndex((e) => e.src === src);
      if (filter === -1) {
        mediaArray.push(mediaData);
      }
    }
  }

  setTimeout(copyMediaSrcToLocalStorage, 1000); // Call the function again after 1 second
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "TEXT") {
    mySpan = document.querySelector('section > ul > li > div > span > span').innerText;
    copyMediaSrcToLocalStorage();
  }
});
