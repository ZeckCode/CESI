import { useState } from "react";
import "../AdminWebsiteCSS/CMSModule.css";

export default function CMSModule() {
  const [announcement, setAnnouncement] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [posts, setPosts] = useState([]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handlePost = async () => {
    if (!announcement && !image) return;

    const newPost = {
      id: Date.now(),
      text: announcement,
      image: preview,
      date: new Date().toLocaleString()
    };

    setPosts([newPost, ...posts]);
    setAnnouncement("");
    setImage(null);
    setPreview(null);

    // future backend hook
    try {
      await fetch("http://localhost:5000/api/cms/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost)
      });
    } catch {
      console.log("Backend not connected yet");
    }
  };

  return (
    <div className="cms-container">
      <h2>CMS Module (CESI Website Control)</h2>

      <div className="cms-editor">
        <textarea
          placeholder="Write announcement for CESI site..."
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
        />

        <input type="file" accept="image/*" onChange={handleImage} />

        {preview && <img src={preview} className="preview-img" alt="preview" />}

        <button onClick={handlePost}>Publish</button>
      </div>

      <div className="cms-posts">
        <h3>Posted Announcements</h3>
        {posts.map(post => (
          <div key={post.id} className="cms-post">
            <p className="cms-date">{post.date}</p>
            <p>{post.text}</p>
            {post.image && <img src={post.image} alt="post" />}
          </div>
        ))}
      </div>
    </div>
  );
}
