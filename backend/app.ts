import express from 'express';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import cors from 'cors';


const prisma = new PrismaClient();
const app = express();


app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

const generateSlug = (length: number = 6): string => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

const BASE_URL="http://localhost:3003"


// endpoint to create short url
app.post('/api/shorten', async (req, res): Promise<any> => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Invalid URL' });

  const slug = generateSlug(6);

  try {
    await prisma.urls.create({
      data: {
        originalUrl: url,
        slug,
        createdAt: new Date(),
      },
    });
    res.json({ shortenedUrl: `${BASE_URL}/${slug}` });
  } catch (error) {
    console.error('Error creating URL:', error);
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
});

// endpoint to redirect
app.get('/:slug', async (req, res):Promise<any> => {
  const { slug } = req.params;

  try {
    const existingURL = await prisma.urls.findUnique({ where: { slug } });
    if (!existingURL) return res.status(404).send('URL not found');

    res.redirect(existingURL.originalUrl);
  } catch (error) {
    console.error('Error fetching URL:', error);
    res.status(500).send('Internal server error');
  }
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () =>  console.log(`Server running on http://localhost:${PORT}`));

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
