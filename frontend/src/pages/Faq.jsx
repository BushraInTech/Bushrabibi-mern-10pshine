import React, { useState } from "react";

const Faq = () => {
  const faqs = [
    {
      question: "What is MyNotes?",
      answer:
        "MyNotes is an online platform designed to facilitate the sharing and access of educational resources among college students. It allows users to upload and download study materials such as notes, presentations, and study guides.",
    },
    {
      question: "How do I get started with MyNotes?",
      answer:
        "To get started, simply create an account on our platform. Once registered, you can start uploading your study materials or explore and download resources shared by other students.",
    },
    {
      question: "Is MyNotes free to use?",
      answer:
        "Yes, MyNotes is free to use. We believe in making education accessible to everyone, and our platform is open to all students without any subscription fees.",
    },
    {
      question: "Are my documents secure on MyNotes?",
      answer:
        "Absolutely. We prioritize the security and privacy of your documents. MyNotes employs advanced encryption and security measures to ensure the confidentiality of your uploaded materials.",
    },
    
    {
      question: "How can I search for specific study materials on MyNotes?",
      answer:
        "Use the search bar on the platform to look for specific study materials. You can enter keywords, subjects, or topics to find relevant documents quickly.",
    },
    {
      question: "Can I collaborate with other students on projects using MyNotes?",
      answer:
        "Absolutely. MyNotes offers real-time collaboration tools, allowing you to work on group projects and assignments with your peers. Share, edit, and collaborate seamlessly.",
    },
    
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="lg:min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-[1200px] px-5">
        <h1 className="mb-8 text-4xl font-extrabold text-center text-gray-800">
          Frequently Asked Questions
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-all cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex justify-between items-center">
                {item.question}
                <span className="ml-2 text-indigo-500">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </h2>
              {activeIndex === index && (
                <p className="mt-3 text-gray-700 text-sm sm:text-base">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
