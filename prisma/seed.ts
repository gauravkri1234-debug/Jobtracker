import {
  InterviewType,
  JobType,
  PrismaClient,
  Status,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.application.deleteMany();

  await prisma.application.createMany({
    data: [
      {
        companyName: "Infosys",
        jobRole: "Software Engineer",
        location: "Bangalore",
        jobType: JobType.FullTime,
        ctc: 8,
        applicationDate: new Date("2026-09-28"),
        status: Status.Interview,
        jobUrl: "https://www.infosys.com/careers",
        notes: "Technical interview scheduled. Need to prepare SQL and DSA.",
        interviewDate: new Date("2026-10-12"),
        interviewRound: "Round 2",
        interviewType: InterviewType.Technical,
        interviewNotes: "DSA + Java backend round.",
      },
      {
        companyName: "TCS",
        jobRole: "System Engineer",
        location: "Hyderabad",
        jobType: JobType.FullTime,
        ctc: 4.5,
        applicationDate: new Date("2026-10-02"),
        status: Status.Applied,
        jobUrl: "https://www.tcs.com/careers",
        notes: "Completed NQT. Waiting for next steps.",
      },
      {
        companyName: "Deloitte",
        jobRole: "Analyst",
        location: "Mumbai",
        jobType: JobType.FullTime,
        ctc: 9,
        applicationDate: new Date("2026-09-18"),
        status: Status.Shortlisted,
        jobUrl: "https://www.deloitte.com/careers",
        notes: "Shortlisted after resume screening.",
      },
      {
        companyName: "Google",
        jobRole: "Software Engineer",
        location: "Bangalore",
        jobType: JobType.FullTime,
        ctc: 32,
        applicationDate: new Date("2026-09-05"),
        status: Status.Interview,
        jobUrl: "https://careers.google.com",
        notes: "Technical interview scheduled.",
        interviewDate: new Date("2026-10-15"),
        interviewRound: "Round 1",
        interviewType: InterviewType.Technical,
        interviewNotes: "Graphs and system design.",
      },
      {
        companyName: "Amazon",
        jobRole: "SDE Intern",
        location: "Hyderabad",
        jobType: JobType.Internship,
        ctc: 12,
        applicationDate: new Date("2026-08-22"),
        status: Status.Assessment,
        jobUrl: "https://www.amazon.jobs",
        notes: "Completed online assessment. Need to prepare SQL and DSA for technical round.",
      },
      {
        companyName: "Microsoft",
        jobRole: "Software Engineer",
        location: "Noida",
        jobType: JobType.FullTime,
        ctc: 28,
        applicationDate: new Date("2026-08-10"),
        status: Status.Offer,
        jobUrl: "https://careers.microsoft.com",
        notes: "Offer received. Reviewing joining date.",
      },
      {
        companyName: "Wipro",
        jobRole: "Project Engineer",
        location: "Pune",
        jobType: JobType.FullTime,
        ctc: 3.5,
        applicationDate: new Date("2026-07-30"),
        status: Status.Rejected,
        notes: "Rejected after HR round.",
      },
      {
        companyName: "Accenture",
        jobRole: "Associate Software Engineer",
        location: "Chennai",
        jobType: JobType.FullTime,
        ctc: 4.5,
        applicationDate: new Date("2026-09-12"),
        status: Status.Applied,
        jobUrl: "https://www.accenture.com/careers",
      },
      {
        companyName: "Zoho",
        jobRole: "Member Technical Staff",
        location: "Chennai",
        jobType: JobType.FullTime,
        ctc: 8.4,
        applicationDate: new Date("2026-09-20"),
        status: Status.Assessment,
        notes: "Aptitude + coding assessment.",
      },
      {
        companyName: "Atlassian",
        jobRole: "Graduate Software Engineer",
        location: "Remote",
        jobType: JobType.FullTime,
        ctc: 40,
        applicationDate: new Date("2026-08-01"),
        status: Status.Rejected,
        notes: "Did not clear OA.",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
