import Container from "../../../Shared/Container";

const InfoCard = () => {
  const cards = [
    {
      image: "https://media.rightmove.co.uk/sold-prices-pod-image.jpeg", // আপনার ইমেজের URL দিয়ে প্রতিস্থাপন করুন
      title: "Sold house prices",
      description:
        "Check what a home sold for plus photos, floorplans and local area insights.",
      linkText: "Search house prices",
      linkUrl: "#",
    },
    {
      image: "https://www.rightmove.co.uk/news/content/uploads/2024/11/BeresfordsThaxtedHeroResized-740x400.jpg", // আপনার ইমেজের URL দিয়ে প্রতিস্থাপন করুন
      title: "Base Rate cut to 4.75% - what could it mean for mortgages?",
      description:
        "Bank of England reduces Base Rate by 0.25% for the second time this year.",
      linkText: "Take a look",
      linkUrl: "#",
    },
    {
      image: "https://www.rightmove.co.uk/news/content/uploads/2024/10/HeroAdobeStock-740x400.jpg", // আপনার ইমেজের URL দিয়ে প্রতিস্থাপন করুন
      title: "10 mistakes adding £100s to your energy bill",
      description:
        "Simple changes and tips that could save you money this winter.",
      linkText: "Take a look",
      linkUrl: "#",
    },
  ];

  return (
    <Container>
      <div className="flex flex-col md:flex-row gap-6 mt-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg hover:shadow-lg overflow-hidden border md:w-1/3"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-48 object-cover rounded-xl"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-700 mb-4">{card.description}</p>
              <a
                href={card.linkUrl}
                className="text-gray-400 font-medium hover:underline"
              >
                {card.linkText} &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default InfoCard;
