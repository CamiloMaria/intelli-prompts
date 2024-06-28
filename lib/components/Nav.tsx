'use client'

import Image from "next/image"
import Link from "next/link"
import { ClientSafeProvider, LiteralUnion, getProviders, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { BuiltInProviderType } from "next-auth/providers/index"

type ProviderState = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;

const Nav = () => {
    const isUserLoggedIn = true

    const [providers, setProviders] = useState<ProviderState>(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const fetchProviders = async () => {
            const providerData = await getProviders();
            setProviders(providerData);
        };

        fetchProviders();
    }, []);

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="/assets/images/logo.svg"
                    alt="IntelliPrompt Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">IntelliPrompts</p>
            </Link>

            <div className="sm:flex hidden">
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Prompt
                        </Link>

                        <button type="button" onClick={(event) => {
                            event.preventDefault();
                            signOut();
                        }} className="outline_btn">
                            Sign Out
                        </button>

                        <Link href="/profile" className="flex gap-2 flex-center">
                            <Image
                                src="/assets/images/logo.svg"
                                alt="Profile Icon"
                                width={37}
                                height={37}
                                className="rounded-full"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                                Sign in with {provider.name}
                            </button>
                        ))}
                    </>
                )}
            </div>

            <div className="sm:hidden flex relative">
                {isUserLoggedIn ? (
                    <div className="flex">
                        <Image
                            src="/assets/images/logo.svg"
                            alt="Profile Icon"
                            width={37}
                            height={37}
                            className="rounded-full"
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />

                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                                Sign in with {provider.name}
                            </button>
                        ))}
                    </>
                )}
            </div>
        </nav >
    )
}

export default Nav