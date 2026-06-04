import Image from "next/image";

const members = [
  {
    name: "Emilie Choi",
    role: "Account Manager",
    avatar: "/team/manager.jpg",
  },
  {
    name: "Paul Grewal",
    role: "Engineer",
    avatar: "/team/engineer.jpg",
  },
  {
    name: "Alesia Haas",
    role: "Senior Account Manager",
    avatar: "/team/coach.jpg",
  },
  {
    name: "Greg Tusar",
    role: "Account Director",
    avatar: "/team/director.jpg",
  },
];

export default function TeamSection() {
  return (
    <section className="py-6 md:py-12">
      <div className="mx-auto max-w-3xl px-8 lg:px-0">
        <h2 className="mb-8 text-4xl font-bold md:mb-16 lg:text-5xl">
          Our team
        </h2>

        <div>
          <h3 className="mb-6 text-lg font-medium">Experts</h3>
          <div className="grid grid-cols-2 gap-4 border-t py-6 md:grid-cols-4">
            {members.map((member, index) => (
              <div key={index}>
                <div className="bg-background size-20 rounded-full border p-0.5 shadow shadow-zinc-950/5">
                  <Image
                    className="aspect-square rounded-full object-cover"
                    src={member.avatar}
                    alt={member.name}
                    height="460"
                    width="460"
                    loading="lazy"
                  />
                </div>
                <span className="mt-2 block text-sm">{member.name}</span>
                <span className="text-muted-foreground block text-xs">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
