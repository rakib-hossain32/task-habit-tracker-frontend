import Link from "next/link";

const footerLinks = [
  { name: "Privacy", href: "#" },
  { name: "Terms", href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t mt-8">
      <div className="mx-auto max-w-7xl px-4 py-6 flex items-center justify-between text-sm text-muted-foreground">
        <div>© {new Date().getFullYear()} StackKit</div>
        <div className="flex gap-4">
                    {footerLinks.map((link, idx) => (
            <Link key={idx} href={link.href} className="underline">
              {link.name}
            </Link>
          ))}
          
        </div>
      </div>
    </footer>
  );
}
