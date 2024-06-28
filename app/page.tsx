import { Feed } from "@lib/components"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Powered Prompts </span>
      </h1>
      <p className="desc text-center">
        IntelliPrompt is a platform for discovering and sharing AI prompt ideas.
      </p>

      <Feed />
    </section>
  )
}

export default Home