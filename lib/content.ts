export type Flavor = "blackCherry" | "grape" | "lemonLime" | "strawberryLemonade" | "watermelon";

export const content = {
  hero: {
    heading: "Live Gutsy",
    subheading: "Soda Perfected",
    body: "3-5g sugar. 9g fiber. 5 delicious flavors.",
    buttonText: "Shop Now",
    buttonHref: "#",
    secondHeading: "Try all five flavors",
    secondBody:
      "Our soda is made with real fruit juice and a touch of cane sugar. We never use artificial sweeteners or high fructose corn syrup. Try all five flavors and find your favorite!",
    cansImage: {
      src: "/images/all-cans-bunched.png",
      alt: "All of the Belal Flavors",
      width: 1603,
      height: 1791,
    },
  },
  skyDive: {
    sentence: "Dive into better health",
    flavor: "blackCherry" as Flavor,
  },
  carousel: {
    heading: "Choose Your Flavor",
    priceCopy: "12 cans - $35.99",
  },
  alternatingText: [
    {
      heading: "Gut-Friendly Goodness",
      body: "Our soda is packed with prebiotics and 1 billion probiotics, giving your gut the love it deserves. Say goodbye to bloating and hello to a happy, healthy digestive system with every sip.",
    },
    {
      heading: "Light Calories, Big Flavor",
      body: "Indulge in bold, refreshing taste without the guilt. At just 20 calories per can, you can enjoy all the flavor you crave with none of the compromise.",
    },
    {
      heading: "Naturally Refreshing",
      body: "Made with only the best natural ingredients, our soda is free from artificial sweeteners and flavors. It’s a crisp, clean taste that feels as good as it tastes, giving you a boost of real, natural refreshment.",
    },
  ],
  bigText: {
    first: "Soda",
    second: "that makes you",
    third: "Smile",
  },
};
