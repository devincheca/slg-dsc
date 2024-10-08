const STATIC_HOST_URL = 'https://d192o2s5j5c0mk.cloudfront.net';

const LAMBDA_URL = 'https://nv2vz41k98.execute-api.us-east-1.amazonaws.com/default/slg-dsc-wed'

const LAMBDA_ACTIONS = {
  'GET_URL': 'GET_URL',
};

const TableName = 'slg-dsc-wed-images';

const loadImageIds = async () => {
  const response = await fetch(LAMBDA_URL);
  const responseJson = await response.json();

  const imageUrls = responseJson.Items
    .map(({ Id }) => `${STATIC_HOST_URL}/image-${Id}`);

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
            document.getElementById(src).src = src;
            observer.disconnect();
          }
        }
      }, {});

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

