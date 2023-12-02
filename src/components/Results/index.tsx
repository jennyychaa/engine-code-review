'use client'

import Image from 'next/image';

import { ImageType } from "../../types"

type ResultsProps = {
    data: ImageType[]
}

const filterOutNudity = (data: ImageType[]) => {
    const filteredData: ImageType[] = []

    for(let i = 0; i < data.length; i++) {
        if(!data[i].title.match(/nud(e|ity)/i)) {
            filteredData.push(data[i])
        }
    }

    return filteredData
}

const Display: React.FC<Omit<ImageType, '_score'>> = ({ title, image_id, artist_display }) => {
    return (
        <div style={{
            margin: '1em',
            border: '1px solid',
            padding: '1em',
            background: '#222',
            display: 'flex',
            maxWidth: '400px'
        }}>
            <Image
                src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
                alt={title}
                width="200"
                height="200"
                style={{ height: 'auto' }}
            />
            <div style={{ marginLeft: '1em' }}>
                <h2 style={{ marginBottom: '0.5em' }}>{title}</h2>
                <p style={{ marginTop: '0.5em'}}>{artist_display}</p>
            </div>
        </div>
    )
}

const Results = ({ data }: ResultsProps): JSX.Element => {
    let sanitizedData = data
        .sort((a: ImageType, b: ImageType) => a.title < b.title ? -1 : 1)
        .filter(dataItem => !dataItem.title.match(/nud(e|ity)/i));

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {sanitizedData.map((image, i) =>
                <Display key={i} {...image} />
            )}
        </div>
    )
}

export default Results
