export type Language = "en" | "fa";

export interface Translation {
  greeting: string;
  suggestions: string[];
  responses: {
    [key: string]: {
      answer: string;
      actions?: {
        label: string;
      }[];
    };
  };
  inputPlaceholder: string;
  defaultResponse: string;
  commands: {
    cdResume: string;
  };
  resume: {
    title: string;
    backToHome: string;
    summary: string;
    experience: {
      title: string;
      jobs: Array<{
        title: string;
        company: string;
        period: string;
        description: string[];
      }>;
    };
    education: {
      title: string;
      items: Array<{
        degree: string;
        school: string;
        period: string;
      }>;
    };
    skills: {
      title: string;
      categories: Array<{
        name: string;
        items: string[];
      }>;
    };
  };
}

export const translations: Record<Language, Translation> = {
  en: {
    greeting: "Hi, my name is Afshar",
    suggestions: [
      "What projects have you worked on?",
      "Tell me about your skills",
      "What's your background?",
      "How can I contact you?",
      "What are you passionate about?",
      "Show me your portfolio"
    ],
    responses: {
      "What projects have you worked on?": {
        answer: "I've built various web applications using React, TypeScript, and modern tools."
      },
      "Tell me about your skills": {
        answer: "I specialize in full-stack development with expertise in React, Node.js, and cloud services."
      },
      "What's your background?": {
        answer: "I'm a passionate developer with years of experience in creating user-centric applications.",
        actions: [
          { label: "View Resume" }
        ]
      },
      "How can I contact you?": {
        answer: "You can reach me at afshar@example.com or connect on LinkedIn.",
        actions: [
          { label: "Email Me" },
          { label: "LinkedIn" }
        ]
      },
      "What are you passionate about?": {
        answer: "I'm passionate about building elegant solutions to complex problems and continuous learning."
      },
      "Show me your portfolio": {
        answer: "Check out my work on GitHub or visit my personal portfolio site.",
        actions: [
          { label: "GitHub" },
          { label: "Portfolio" }
        ]
      }
    },
    inputPlaceholder: "Type your question...",
    defaultResponse: "That's an interesting question! Let's discuss it further.",
    commands: {
      cdResume: "Navigating to resume page"
    },
    resume: {
      title: "Career History",
      backToHome: "Back to Terminal",
      summary: "Passionate software developer with extensive experience in building modern web applications. Specialized in React, TypeScript, and full-stack development.",
      experience: {
        title: "Experience",
        jobs: [
          {
            title: "Senior Full Stack Developer",
            company: "Tech Innovations Inc.",
            period: "2021 - Present",
            description: [
              "Led development of enterprise web applications using React and Node.js",
              "Architected scalable microservices infrastructure",
              "Mentored junior developers and conducted code reviews",
              "Improved application performance by 40% through optimization"
            ]
          },
          {
            title: "Full Stack Developer",
            company: "Digital Solutions Co.",
            period: "2019 - 2021",
            description: [
              "Built responsive web applications with React and TypeScript",
              "Developed RESTful APIs using Node.js and Express",
              "Collaborated with design team to implement pixel-perfect UIs",
              "Implemented CI/CD pipelines and automated testing"
            ]
          },
          {
            title: "Frontend Developer",
            company: "Creative Studios",
            period: "2017 - 2019",
            description: [
              "Created interactive user interfaces using React and modern CSS",
              "Optimized web applications for maximum speed and scalability",
              "Worked closely with UX designers to improve user experience",
              "Maintained and improved existing codebase"
            ]
          }
        ]
      },
      education: {
        title: "Education",
        items: [
          {
            degree: "Bachelor of Science in Computer Science",
            school: "University of Technology",
            period: "2013 - 2017"
          }
        ]
      },
      skills: {
        title: "Skills",
        categories: [
          {
            name: "Frontend",
            items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML/CSS"]
          },
          {
            name: "Backend",
            items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"]
          },
          {
            name: "Tools & DevOps",
            items: ["Git", "Docker", "AWS", "CI/CD", "Jest"]
          }
        ]
      }
    }
  },
  fa: {
    greeting: "سلام، اسم من افشار است",
    suggestions: [
      "روی چه پروژه‌هایی کار کرده‌اید؟",
      "در مورد مهارت‌هایتان بگویید",
      "پیشینه شما چیست؟",
      "چطور می‌توانم با شما تماس بگیرم؟",
      "به چه چیزی علاقه‌مندید؟",
      "نمونه کارهایتان را نشان دهید"
    ],
    responses: {
      "روی چه پروژه‌هایی کار کرده‌اید؟": {
        answer: "من برنامه‌های وب مختلفی را با استفاده از React، TypeScript و ابزارهای مدرن ساخته‌ام."
      },
      "در مورد مهارت‌هایتان بگویید": {
        answer: "من در توسعه فول‌استک با تخصص در React، Node.js و سرویس‌های ابری تخصص دارم."
      },
      "پیشینه شما چیست؟": {
        answer: "من یک توسعه‌دهنده پرشور با سال‌ها تجربه در ایجاد برنامه‌های کاربرمحور هستم.",
        actions: [
          { label: "مشاهده رزومه" }
        ]
      },
      "چطور می‌توانم با شما تماس بگیرم؟": {
        answer: "می‌توانید از طریق afshar@example.com با من تماس بگیرید یا در LinkedIn متصل شوید.",
        actions: [
          { label: "ایمیل بزنید" },
          { label: "لینکدین" }
        ]
      },
      "به چه چیزی علاقه‌مندید؟": {
        answer: "من به ساخت راه‌حل‌های زیبا برای مشکلات پیچیده و یادگیری مستمر علاقه‌مندم."
      },
      "نمونه کارهایتان را نشان دهید": {
        answer: "کارهای من را در GitHub ببینید یا از سایت نمونه کارهای شخصی من دیدن کنید.",
        actions: [
          { label: "گیت‌هاب" },
          { label: "نمونه کارها" }
        ]
      }
    },
    inputPlaceholder: "سوال خود را بنویسید...",
    defaultResponse: "این سوال جالبی است! بیایید بیشتر در موردش صحبت کنیم.",
    commands: {
      cdResume: "در حال انتقال به صفحه رزومه"
    },
    resume: {
      title: "سابقه شغلی",
      backToHome: "بازگشت به ترمینال",
      summary: "توسعه‌دهنده نرم‌افزار پرشور با تجربه گسترده در ساخت برنامه‌های وب مدرن. متخصص در React، TypeScript و توسعه فول‌استک.",
      experience: {
        title: "تجربه کاری",
        jobs: [
          {
            title: "توسعه‌دهنده ارشد فول استک",
            company: "شرکت نوآوری‌های فناوری",
            period: "۲۰۲۱ - اکنون",
            description: [
              "رهبری توسعه برنامه‌های وب سازمانی با استفاده از React و Node.js",
              "معماری زیرساخت میکروسرویس‌های مقیاس‌پذیر",
              "مربیگری توسعه‌دهندگان جونیور و بررسی کد",
              "بهبود عملکرد برنامه به میزان ۴۰٪ از طریق بهینه‌سازی"
            ]
          },
          {
            title: "توسعه‌دهنده فول استک",
            company: "شرکت راه‌حل‌های دیجیتال",
            period: "۲۰۱۹ - ۲۰۲۱",
            description: [
              "ساخت برنامه‌های وب واکنش‌گرا با React و TypeScript",
              "توسعه APIهای RESTful با استفاده از Node.js و Express",
              "همکاری با تیم طراحی برای پیاده‌سازی رابط کاربری دقیق",
              "پیاده‌سازی خطوط لوله CI/CD و تست خودکار"
            ]
          },
          {
            title: "توسعه‌دهنده فرانت‌اند",
            company: "استودیوهای خلاق",
            period: "۲۰۱۷ - ۲۰۱۹",
            description: [
              "ایجاد رابط‌های کاربری تعاملی با استفاده از React و CSS مدرن",
              "بهینه‌سازی برنامه‌های وب برای حداکثر سرعت و مقیاس‌پذیری",
              "کار نزدیک با طراحان UX برای بهبود تجربه کاربر",
              "نگهداری و بهبود پایگاه کد موجود"
            ]
          }
        ]
      },
      education: {
        title: "تحصیلات",
        items: [
          {
            degree: "کارشناسی علوم کامپیوتر",
            school: "دانشگاه فناوری",
            period: "۲۰۱۳ - ۲۰۱۷"
          }
        ]
      },
      skills: {
        title: "مهارت‌ها",
        categories: [
          {
            name: "فرانت‌اند",
            items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML/CSS"]
          },
          {
            name: "بک‌اند",
            items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"]
          },
          {
            name: "ابزارها و DevOps",
            items: ["Git", "Docker", "AWS", "CI/CD", "Jest"]
          }
        ]
      }
    }
  }
};
