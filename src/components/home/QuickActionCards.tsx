import Link from "next/link";

export function QuickActionCards() {
  const cards = [
    {
      title: "Become a Member",
      description: "Join KMEW and access our support network, programs and community initiatives.",
      linkText: "Register Now →",
      href: "/register/member",
      bgColor: "bg-[#eaf6f1]",
      borderColor: "border-[#d8efe5]",
      linkColor: "text-[#0e705b]",
      iconSrc: "/icons/card-icon-member.png",
      iconAlt: "Become a Member",
      iconHeight: "h-9 sm:h-10",
    },
    {
      title: "Become an Associate",
      description: "Help us support members in your community and create real impact.",
      linkText: "Join Us →",
      href: "/register/associate",
      bgColor: "bg-[#e8f6fe]",
      borderColor: "border-[#d6ecfa]",
      linkColor: "text-[#2563eb]",
      iconSrc: "/icons/card-icon-associate.png",
      iconAlt: "Become an Associate",
      iconHeight: "h-8 sm:h-9",
    },
    {
      title: "Member Login",
      description: "Manage your profile, contributions and stay connected with your associate.",
      linkText: "Login Now →",
      href: "/login",
      bgColor: "bg-[#fdf5e6]",
      borderColor: "border-[#f8eed6]",
      linkColor: "text-[#163832]",
      iconSrc: "/icons/card-icon-login.png",
      iconAlt: "Member Login",
      iconHeight: "h-8 sm:h-9",
    },
    {
      title: "Support KMEW",
      description: "Contribute to our initiatives and help us create brighter futures.",
      linkText: "Donate Now →",
      href: "/donate",
      bgColor: "bg-[#fdeded]",
      borderColor: "border-[#fae2e2]",
      linkColor: "text-[#e03131]",
      iconSrc: "/icons/card-icon-donate.png",
      iconAlt: "Support KMEW",
      iconHeight: "h-8 sm:h-9",
    },
  ];

  return (
    <section className="py-6 sm:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={`${card.bgColor} ${card.borderColor} border rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between group min-h-[210px]`}
            >
              <div>
                <div className="h-10 flex items-center mb-3.5">
                  <img
                    src={card.iconSrc}
                    alt={card.iconAlt}
                    className={`${card.iconHeight} w-auto object-contain`}
                  />
                </div>

                <h2
                  className="text-base sm:text-[17px] font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#0e705b] transition-colors"
                  style={{ fontFamily: 'var(--font-serif, "Playfair Display", Georgia, serif)' }}
                >
                  {card.title}
                </h2>

                <p className="text-xs sm:text-[12.5px] text-slate-600 leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>

              <div className={`mt-5 flex items-center text-xs sm:text-[13px] font-bold ${card.linkColor}`}>
                <span>{card.linkText}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
