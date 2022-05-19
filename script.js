//event listeners
document.getElementById('get').addEventListener('click', getAPI)
document.getElementById('export').addEventListener('click', saveToFile)

//document handles
const status = document.getElementById('status')
const headers = document.getElementById('headers')
const data = document.getElementById('data')
const config = document.getElementById('config')
const api_url = document.getElementById('api-url')

function getAPI() {
  if (api_url.value === '') return
  axios
    .get(api_url.value, { timeout: 5000 })
    .then((res) => {
      console.log(res)
      showResponse(res)
    })
    .catch((err) => {
      console.log(err)
      showError(err)
    })
}

function showResponse(res) {
  clear()
  status.innerText = res.status
  headers.innerText = JSON.stringify(res.headers, null, 2)
  data.innerText = JSON.stringify(res.data, null, 2)
  config.innerText = JSON.stringify(res.config, null, 2)
}

function showError(err) {
  clear()
  status.innerText = err
}

function clear() {
  status.innerText = ''
  headers.innerText = ''
  data.innerText = ''
  config.innerText = ''
}

async function saveToFile() {
  const myBlob = new Blob([data.innerText], { type: 'application/json' })
  const fileHandle = await getNewFileHandle()
  const fileStream = await fileHandle.createWritable()
  await fileStream.write(myBlob)
  await fileStream.close()
}

function getNewFileHandle() {
  const options = {
    startIn: 'downloads',
    suggestedName: 'data',
    types: [
      {
        description: 'JSON File',
        accept: { 'application/json': ['.json'] },
      },
    ],
  }
  return window.showSaveFilePicker(options)
}
