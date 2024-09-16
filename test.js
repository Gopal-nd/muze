function extractVideoId(url) {
    const regex = ;
    const match = url.match(/[?&]v=([^&]+)/);
    
    console.log(match[1])
    if (match && match[1]) {
      return match[1];
    } else {
      return null;  // Return null if no match is found
    }
  }
  
  const url = "https://www.youtube.com/watch?v=lM8h5Mm6ODo&list=RDGMEMCMFH2exzjBeE_zAHHJOdxg&index=14";
  const videoId = extractVideoId(url);
  console.log(videoId);  // Outputs: lM8h5Mm6ODo
  