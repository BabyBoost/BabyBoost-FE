const MyApp = {
  sharedData: {},
  setSharedData(key, value) {
    this.sharedData[key] = value;
    localStorage.setItem('bfdb816a-fed1-4b2f-a68f-5fecc9c7e04c', JSON.stringify(this.sharedData));
  },
  getSharedData(key) {
    const storedData = localStorage.getItem('bfdb816a-fed1-4b2f-a68f-5fecc9c7e04c');
    if (storedData) {
      this.sharedData = JSON.parse(storedData);
    }
    return this.sharedData[key];
  },
  deleteSharedData(key) {
    if (key in this.sharedData) {
      delete this.sharedData[key];
      localStorage.setItem('bfdb816a-fed1-4b2f-a68f-5fecc9c7e04c', JSON.stringify(this.sharedData));
      return true;
    }
    return false;
  },
};

export default MyApp;
