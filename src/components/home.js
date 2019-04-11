import React from 'react';
import { ipcRenderer } from 'electron';

const styles = {
  main: {
    textAlign: "center",
    marginTop: 100,
  },
  logo: {
    src: "./assets/app.png"
  },
  electron: {
    color: "#3a585f",
  },
  react: {
    color: "#61dafb",
  },
  webpack: {
    color: "#53b7e6",
  },
  babel: {
    color: "#f5da55",
  },
  version: {
    fontSize: 12,
    color: "gray",
  },
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount = () => {
    this.setState({ loading: false })
  }

  _handleClick = () => {
    var res = ipcRenderer.sendSync('get-result', { name: 'react' })
    alert(res);
  }

  render() {
    return (
      <div style={styles.main}>
        <img src={styles.logo.src} alt="" />
        <h2>
          <span style={styles.electron}>Electron</span>,
          <span style={styles.react}> React</span>,
          <span style={styles.webpack}> Webpack</span>,
          <span style={styles.babel}> Babel</span></h2>
          <p style={styles.version}>v1.0.0</p>
      </div>
    );
  }
}

export default Home;