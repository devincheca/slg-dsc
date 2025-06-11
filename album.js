// const STATIC_HOST_URL = 'https://d192o2s5j5c0mk.cloudfront.net';
const STATIC_HOST_URL = 'https://d2wam6qj2bskgp.cloudfront.net';

const LAMBDA_URL = 'https://nv2vz41k98.execute-api.us-east-1.amazonaws.com/default/slg-dsc-wed'

const LAMBDA_ACTIONS = {
  'GET_URL': 'GET_URL',
};

const TableName = 'slg-dsc-wed-images';

// excluded for duplicates and other stuff
const excludedPhotoIds = {
  "D&S-46": true,
  "D&S-47": true,
  "D&S-48": true,
  "D&S-49": true,
  "D&S-51": true,
  "D&S-86": true,
  "image-f69f7490-ed40-4a01-879b-19f3f39bb9ab": true,
  "image-9448f0d1-4474-4ed5-856a-c204c9bb8044": true,
  "image-cb1871f8-b333-41d6-93c8-bc18094c3318": true,
  "image-447366d4-e2b8-4f47-a032-d2f1f3d80baf": true,
  "image-f5020b83-c3a8-450e-b8c6-3f240156de3b": true,
  "image-eed7ed44-1cc4-4b43-ac5b-4bd70db6d526": true,
  "image-278ee1a9-12a9-4982-a574-d4d28cd8e028": true,
  "image-89f61e1f-494c-435b-bf80-0999dd200607": true,
  "image-d1a1b6db-c549-44a8-a430-81f94386f792": true,
};

const loadImageIds = async () => {
  const response = await fetch(`${STATIC_HOST_URL}/manifest.json`);
  const responseJson = await response.json();

  // for dynamo images, this needs to get adjusted to support uploads later
  // if that ends up being the case
  // const imageUrls = responseJson.Items
    // .map(({ Id }) => `${STATIC_HOST_URL}/image-${Id}`);

  const imageUrls = responseJson
    .filter(fileName => !fileName.includes('html'))
    .filter(fileName => !excludedPhotoIds[fileName.split('.')[0]])
    .map(fileName => `${STATIC_HOST_URL}/${fileName}`);

  const gallery = document.getElementById('gallery-div');

  imageUrls
    .map(src => ({ src, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ src }) => src)
    .map((src, i) => {
      const img = document.createElement('img');
      img.id = src;

      if (i === 0) img.src = src;

      gallery.appendChild(img);

      const observer = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const img = document.getElementById(src);
            img.src = src;

            observer.disconnect();
          }
        }
      }, {
        root: gallery,
        rootMargin: '30px',
        threshold: .01
      });

      observer.observe(img);
    });

};

(() => loadImageIds())();

const focusUploadButton = () => {
  document.getElementById('upload-button').focus();
};

const showLoader = () => {
  document.getElementById('loader').style.display = 'block';
};

const uploadPhotos = async () => {
  const fileInput = document.getElementById('file-input');

  if (!fileInput.value) {
    return showError('Choose a file to upload');
  }

  showLoader();

  const Id = crypto.randomUUID();
  const urlResponse = await fetch(LAMBDA_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      Action: LAMBDA_ACTIONS.GET_URL,
      TableName,
      Id,
      Item: { Id },
    }),
  });

  const { signedUrl } = await urlResponse.json();

  const file = fileInput.files[0];
  const type = fileInput.type;

  const fileReader = new FileReader();

  fileReader.onload = event => event && event.target && uploadFile({
    image: event.target.result,
    url: signedUrl,
    type,
  });

  fileReader.readAsDataURL(file);

  const uploadResponse = await fetch(signedUrl, {
  });
};

const uploadFile = async (file) => {
  const { image, url, type } = file;
  if (image && typeof image === 'string') {
    const binary = atob(image.split(',')[1]);
    const array = [];

    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }

    const blobData = new Blob([new Uint8Array(array)], { type })

    await fetch(url, {
      method: 'PUT',
      body: blobData
    });

    location.reload();
  }
}

const showError = error => {
  document.getElementById('errorMessage').innerHTML = error;
  document.getElementById('errorMessage').style.display = 'block';
  setTimeout(() => {
    document.getElementById('errorMessage').innerHTML = '';
    document.getElementById('errorMessage').style.display = 'none';
  }, 5000);
}

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Origin': 'http://localhost:3000',
  };
}

