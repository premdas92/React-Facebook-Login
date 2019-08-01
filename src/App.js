import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import { FacebookProvider, LoginButton, Profile } from "react-facebook";

import "./App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
      picture: "",
      error: "",
      isUserLoggedIn: false
    };
  }
  handleResponse = data => {
    console.log(data);
    data.profile ? this.setState({isUserLoggedIn: true}) : this.setState({isUserLoggedIn: false})
    this.setState({
      email: data.profile.email,
      name: data.profile.name,
      picture: data.profile.picture.data.url
    });
  };

  handleError = error => {
    this.setState({ error });
    console.log(error)
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="monitor">
            <div className="monitorscreen">
              <FacebookProvider appId="1463182537300167">
             { !this.state.isUserLoggedIn &&  <LoginButton
                  scope="email"
                  onCompleted={this.handleResponse}
                  onError={this.handleError}
                >
                  <span>Login via Facebook</span>
                </LoginButton>}
                {this.state.isUserLoggedIn && <Profile>
                  {({ loading, profile }) => (
                    <div className="user-profile">
                      <div className="user-picture">
                        <img src={this.state.picture} />
                      </div>
                      <div className="user-name">{this.state.name}</div>
                      <div className="user-email">{this.state.email}</div>
                    </div>
                  )}
                </Profile>}
              </FacebookProvider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
