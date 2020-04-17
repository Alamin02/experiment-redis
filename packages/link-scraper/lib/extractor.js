const onChange = require('on-change');

class Extractor {
  constructor(dataUpdateCallback) {
    if (Extractor.instance) {
      return Extractor.instance;
    }
    this.dataUpdateCallback = dataUpdateCallback;
    Extractor.instance = this;
    return this;
  }

  state = {
    level0: {},
    uid: 0,
  };

  watcher = onChange(this.state.level0, (path, value, previousValue) => {
    this.dataUpdateCallback({ link: value });
  });

  insertData = ({ name, url }) => {
    this.watcher[`link${this.state.uid}`] = {
      name,
      url,
    };
    this.state.uid++;
  };

  getData = () => {
    return this.state.level0;
  };
}

module.exports = Extractor;
