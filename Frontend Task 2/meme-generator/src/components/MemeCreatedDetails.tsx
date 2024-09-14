interface MemeCreatedDetailsProps {
  memeUrl: string;
}

const MemeCreatedDetails = ({ memeUrl }: MemeCreatedDetailsProps) => {
  return (
    <div className="meme-display mt-3">
      <h2>Meme Created Successfully!</h2>
      <img
        src={memeUrl}
        alt="Generated Meme"
        className="img-fluid bg-secondary bg-gradient p-3 rounded-5"
        style={{ maxHeight: "80vh" }}
      />
    </div>
  );
};

export default MemeCreatedDetails;
