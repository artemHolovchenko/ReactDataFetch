import React from "react";

class Item extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div key={data.id} className="bd">
        {data.thumbnail.includes("htt") ? (
          <img src={data.thumbnail} alt="" />
        ) : (
          <img src="https://ktonanovenkogo.ru/image/finik.jpg" alt="" />
        )}
        <p>{data.title}</p>
        <p>{data.num_comments}</p>
        <a
          href={`https://www.reddit.com/${data.permalink}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          link
        </a>
      </div>
    );
  }
}

export default Item;
