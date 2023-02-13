import React, {FC} from 'react'
import {useTitle} from 'hooks/useTitle'
import HeroSection from 'components/hero/HeroSection'
import image from 'assets/images/home/home-hero.webp'

const Home: FC = () => {
    useTitle('Pagina Principală')

    const heroData = {
        title: 'Hai să studiem de aici împreună!',
        image: image,
        body: <><p>Platforma ta completă pentru a obține meditații și a studia orele
            preferate.</p>
            <p><i>* Completează câmpul liber de mai jos cu poșta ta electronică pentru a putea urma procedura de
                înregistrare.</i></p></>
    }

    return (
        <>
            <HeroSection
                title={heroData.title}
                image={heroData.image}
                body={heroData.body}
                hasForm={true}
            />
        </>
    )
}

export default Home
