import { Zoom, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion"
import Image from 'next/image'
import { useRouter } from "next/router";

interface ProjectCardProps {
  id: string;
  backgroundImage: string;
  type: string;
  projectName: string;
  paddingBottom?: string
}

export default function ProjectMotionCard({ id, backgroundImage, type, projectName, paddingBottom }: ProjectCardProps) {

  const router = useRouter();

  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        marginRight: '5%',
        maxWidth: isDesktop ? '100%' : 375
      }}
      onClick={() => {
        router.push(`/projects/${id}`)
      }}
    >
      <Zoom in={true} timeout={1000}>
        <div>
          <article className='card' style={{
            position: "relative",
            width: "100%",
            paddingBottom: paddingBottom ?? "65%",
            zIndex: 100,
            cursor: 'pointer',
          }} >
            <Image src={`https://res.cloudinary.com/demo/image/fetch/${backgroundImage}`}
              alt="kuchen"
              layout="fill"
              objectFit="cover"
            />
            <div
              className='title'
            >
              <b>
                <h3 className='underline'>
                  ☆ {type}
                </h3>
                <br />
                <h4 >
                  {projectName}
                </h4>
              </b>
            </div>

            <div
              className='shaddow'
            />
          </article>
          <h3>
            {projectName}
          </h3>
        </div>
      </Zoom>
    </motion.div>
  )
}
