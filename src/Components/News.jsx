import React, { useEffect } from "react";
import { FaLeaf } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const News = () => {
  const newsArticles = [
    {
      image:
        "https://7oroofthemes.com/agritec/wp-content/uploads/elementor/thumbs/blog-6-rcg7wuspaeztufstodijwsuze06ukkhs4b5k4hcr18.webp",
      categories: ["Agriculture", "Farm"],
      title:
        "How to optimize all your farm inputs for great efficiency during low commodity prices times!",
      date: "September 4, 2025",
      author: "Nikolas Gibbons",
      excerpt:
        "When a producer evaluates what is necessary to grow a good crop, there are very few inputs that can be forgone. At that point, our objective is to make sure...",
      link: "#",
    },
    {
      image:
        "https://7oroofthemes.com/agritec/wp-content/uploads/elementor/thumbs/blog-5-rcg7wsx0wqx977vjzcpartc278g456abg1ul5xfjdo.webp",
      categories: ["Fields", "Tax"],
      title:
        "Tax deductions available for residual fertility on purchased land beneficial ownership.",
      date: "September 4, 2025",
      author: "Nikolas Gibbons",
      excerpt:
        "When farmland is purchased, tax code allows the purchaser to deduct the value of the excess fertility in the field like other improvements on the ground, such that...",
      link: "#",
    },
    {
      image:
        "https://7oroofthemes.com/agritec/wp-content/uploads/elementor/thumbs/blog-4-rcg7wuspaeztufstodijwsuze06ukkhs4b5k4hcr18.webp",
      categories: ["Agriculture", "Food"],
      title:
        "Can urban agriculture feed our cities sustainably? Insights from experts around the world!!",
      date: "September 4, 2025",
      author: "Nikolas Gibbons",
      excerpt:
        "In a typical food network model, you buy a 'share' before planting, this enables the farmer to purchase seeds, compost and technology without taking out loans our...",
      link: "#",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true, // animate only once
    });
  }, []);

  const ArticleCard = ({ article, index }) => (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow "
      data-aos="fade-up"
      data-aos-delay={index * 100} // staggered animation
    >
      <div className="relative">
        {/* Article Image */}
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-52 transform transition ease-in-out duration-700 hover:scale-105 hover:shadow-lg object-cover"
        />

        {/* Categories Tags */}
        <div className="absolute top-4 left-4 flex space-x-2">
          {article.categories.map((cat, idx) => (
            <span
              key={idx}
              className="text-xs font-semibold px-3 py-1 bg-green-600 text-white rounded-md shadow-md"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-extrabold text-[#1e2939] mb-4 hover:text-green-700 transition-colors duration-200 cursor-pointer">
          {article.title}
        </h3>

        {/* Meta Data */}
        <p className="text-sm text-gray-500 mb-4 flex items-center">
          {article.date} —{" "}
          <span className="ml-1 text-green-700 font-medium">
            {article.author}
          </span>
        </p>

        {/* Excerpt */}
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
          {article.excerpt}
        </p>

        {/* Read More Button */}
        <a
          href={article.link}
          className="inline-flex items-center text-white bg-green-700 hover:bg-green-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
        >
          Read More →
        </a>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header Section */}
        <div data-aos="fade-up">
          <p className="text-lg text-green-700 font-medium tracking-wide">
            Latest ideas & insights from the world!
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1e2939]">
            Farming and agriculture news from farmers!
          </h2>
          <div className="flex justify-center mt-4 mb-12">
            <FaLeaf className="text-green-700 text-3xl opacity-70" />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsArticles.map((article, index) => (
            <ArticleCard key={index} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
