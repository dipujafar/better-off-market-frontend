"use client"

import Link from "next/link"
import { quickLinks, settingsLinks } from "./footer.data"
import logoImage from "@/assets/images/logo-white.png"
import Image from "next/image"
import facebookIcon from "@/assets/icons/facebook_icon.png";
import linkedinIcon from "@/assets/icons/linkedin_icon.png";
import twitterIcon from "@/assets/icons/twitter_icon.png";
import Container from "../container/Container"

export default function Footer() {
    return (
        <footer className="bg-[#1F2937] text-slate-100 xl:py-16 md:py-12 ">
            <Container className="py-8 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Quick Access Column */}
                    <div>
                        <h3 className="sm:mb-4 mb-3 xl:text-xl font-semibold uppercase tracking-wide text-white">
                            Quick Access
                        </h3>
                        <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                            {
                                quickLinks?.map((link, idx) => <li key={idx}>
                                    <Link href={link.href} className="hover:text-white transition-colors sm:text-base text-sm font-medium">
                                        {link.label}
                                    </Link>
                                </li>)
                            }


                        </ul>
                    </div>

                    {/* Settings Column */}
                    <div>
                        <div className="mb-8">
                            <h3 className="sm:mb-4 mb-3 xl:text-xl font-semibold uppercase tracking-wide text-white">
                                Settings
                            </h3>
                            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                                {
                                    settingsLinks?.map((link, idx) => <li key={idx}>
                                        <Link href={link.href} className="hover:text-white transition-colors sm:text-base text-sm font-medium">
                                            {link.label}
                                        </Link>
                                    </li>)
                                }
                            </ul>
                        </div>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="sm:mb-4 mb-3 xl:text-xl font-semibold uppercase tracking-wide text-white">
                            CONTACT
                        </h3>
                        <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                            <li>
                                <Link href={`mailto:${data?.data?.data?.[0]?.email}`} className="hover:text-white transition-colors sm:text-base text-sm font-medium">
                                    {data?.data?.data?.[0]?.email}
                                </Link>
                            </li>
                            <li>
                                <p className="hover:text-white transition-colors sm:text-base text-sm font-medium">{data?.data?.data?.[0]?.address}</p>
                            </li>
                        </ul>
                    </div>


                    {/* Placeholder Column - hidden on mobile */}
                    <div className="hidden lg:block"></div>

                    {/* Right Column - Logo and Social */}
                    <div className="sm:col-span-2 lg:col-span-1 flex flex-col">
                        <div className="mb-4 space-y-0.5">
                            <Image src={logoImage} alt="logo" className="w-full" />
                            <p className="hover:text-white transition-colors sm:text-base text-sm font-medium">
                                {data?.data?.data?.[0]?.description || "We specialize in helping CPAs, EA firms, and business owners unlock their company's true potential through strategic valuation, growth planning, and exit strategies."}
                            </p>
                        </div>

                        {/* ===================== Social Links =========================== */}
                        <div className="flex items-center gap-x-2">
                            <Link href={data?.data?.data?.[0]?.facebook || "https://www.facebook.com"} className="bg-white size-7 flex-center rounded-full">
                                <Image src={facebookIcon} alt="facebook" />
                            </Link>
                            <Link href={data?.data?.data?.[0]?.twitter || "https://www.linkedin.com"} className="bg-white size-7 flex-center rounded-full">
                                <Image src={linkedinIcon} alt="facebook" />
                            </Link>
                            <Link href={data?.data?.data?.[0]?.linkedin || "https://www.twitter.com"} className="bg-white size-7 flex-center rounded-full">
                                <Image src={twitterIcon} alt="facebook" />
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
