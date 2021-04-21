"use strict";

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return "You liked this";
    }

    /** The non-JSX method
    return e(
      "button",
      { onClick: () => this.setState({ liked: true }) },
      "Like"
    ); **/

    // The JSX method (needs Babel to work)
    return (
      <button
        onClick={() => {
          this.setState({ liked: true });
        }}
      >
        Like
      </button>
    );
  }
}

// Render to specific div container
const container = document.querySelector("#like");
ReactDOM.render(e(LikeButton), container);
