"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { skillsData } from "@/config/skills";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";

interface FreelancerProps {
	freelancerData: {
		name: string;
		title: string;
		profilePicture: string;
		skills: string[];
		experience: {
			company: string;
			title: string;
			years: string;
			description: string;
		}[];
		portfolio: {
			name: string;
			link: string;
			description: string;
		}[];
	};
}

const freelancerData: FreelancerProps["freelancerData"] = {
	name: "Jane Doe",
	title: "Frontend Developer",
	profilePicture: "/profile.jpg", 
	skills: ["React", "JavaScript", "HTML", "CSS", "TypeScript", "Git"],
	experience: [
		{
			company: "Acme Corp",
			title: "Frontend Developer",
			years: "2021 - Present",
			description:
				"Developed and maintained web applications using React, Redux, and other modern technologies.  Contributed to improving UI/UX and optimizing performance.",
		},
		{
			company: "Beta Solutions",
			title: "Junior Frontend Developer",
			years: "2019 - 2021",
			description:
				"Assisted in building and maintaining web applications using HTML, CSS, and JavaScript. Gained experience in responsive design and cross-browser compatibility.",
		},
	],
	portfolio: [
		{
			name: "E-commerce Website",
			link: "https://ecommerce-example.com",
			description:
				"Developed a responsive e-commerce website with features like product browsing, shopping cart, and checkout.",
		},
		{
			name: "Portfolio Website",
			link: "https://portfolio-example.com",
			description:
				"Created a personal portfolio website to showcase my skills and projects.",
		},
		{
			name: "Weather App",
			link: "https://weather-example.com",
			description:
				"Built a weather application that displays current weather conditions and forecasts.",
		},
	],
};

export default function FreelancerPage() {
	const { theme } = useTheme();
	const data = freelancerData;

	if (!data) {
		return <div>Loading...</div>;
	}
	return (
		<div
			className={cn(
				"freelancer-profile container mx-auto py-12 px-4",
				theme === "dark" ? "dark" : "light"
			)}>
			<Card>
				<CardHeader className="flex flex-col items-center pb-4 gap-4">
					<Avatar className="h-16 w-16 md:h-20 md:w-20">
						<AvatarImage src={data.profilePicture} alt={data.name} />
						<AvatarFallback>{data.name.substring(0, 2)}</AvatarFallback>
					</Avatar>
					<CardTitle className="text-2xl md:text-3xl font-bold">
						{data.name}
					</CardTitle>

					<CardDescription className="text-muted-foreground text-center md:text-lg">
						{data.title}
					</CardDescription>
				</CardHeader>
				<CardContent className="">
					{/* Experience Section */}
					<div>
						<h3 className="text-xl font-semibold mb-2">Experience</h3>
						{data.experience.map((exp) => (
							<div key={exp.company} className="mb-4">
								<h4 className="font-medium">{exp.title}</h4>
								<p className="text-sm text-muted-foreground">
									{exp.company} ({exp.years})
								</p>
								<p className="text-sm">{exp.description}</p>
							</div>
						))}
					</div>

					<div className="mb-4">
						<h3 className="text-xl font-semibold mb-2">Skills</h3>
						<div className="flex flex-wrap gap-2">
							{data.skills.map((skill) => {
								const validSkill =
									skillsData.programming.includes(skill) ||
									skillsData.design.includes(skill);
								return validSkill ? (
									<span
										key={skill}
										className="bg-accent rounded-md px-2 py-1 text-sm text-accent-foreground">
										{skill}
									</span>
								) : null;
							})}
						</div>
					</div>

					{/* Portfolio Section */}
					<div className="md:col-span-2">
						{" "}
						<h3 className="text-xl font-semibold mb-2">Portfolio</h3>
						{data.portfolio.map((project) => (
							<div key={project.name} className="mb-4">
								<Link
									href={project.link}
									target="_blank"
									className="text-primary underline">
									{project.name}
								</Link>
								<p className="text-sm">{project.description}</p>
							</div>
						))}
					</div>
					<div className="md:col-span-2 text-center">
						{" "}
						<Button>Hire Me</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
