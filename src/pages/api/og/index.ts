import { withOGImage } from 'next-api-og-image'

interface QueryParams {
    title: string
    descrption: string
}

export default withOGImage<'query', QueryParams>({
    cacheControl: 'public, max-age=604800, immutable',
    dev: {
        inspectHtml: false,
    },
    template: {
        html: async ({ title, description }) => {
            return `
                <html>
                    <head>
                        ${style}
                    </head>
                    <body>
                    <div class="container">
                    <header>
                        <img src="https://live--streameth.netlify.app/images/logo.png" alt="Favicon" />
                    </header>
                    <div>
                        <h2>${title}</h2>
                        <p class="description">${description}</p>
                    </div>
                    </body>
                </html>
          `;
        }
    }
})

const style = `
<style>
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: #33374c;
  }
  .container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    color: white;
    text-align: center;
    padding: 0 5rem;
  }
  header {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin: 2rem 0;
  }
  .description {
    margin: 2rem 0;
    color: #fff;
    padding: 1rem;
    background-image: linear-gradient(to top right, #00e887, #00E0F3);
  }
</style>
`