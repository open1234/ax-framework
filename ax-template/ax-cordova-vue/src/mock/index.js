import Mock from 'mockjs'
// to import mock file

let mockArrays = []
// add mock data into mockArrays

for (let i in mockArrays) {
  let mockData = mockArrays[i]
  Mock.mock(window.config.baseUrl + mockData.url, mockData.method, mockData.mock)
}
