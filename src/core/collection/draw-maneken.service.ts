import * as nodeCanvas from 'canvas';
const canvasWidth = 150;

export const createManekenImage = async (
  headUrl?: string,
  bodyUrl?: string,
  trousersUrl?: string,
  footUrl?: string,
): Promise<string> => {
  const canvas = nodeCanvas.createCanvas(150, 375);
  const context = canvas.getContext('2d');
  const array: ManekenBaseBodyPart[] = getManekenBaseBodyParts(
    headUrl,
    bodyUrl,
    trousersUrl,
    footUrl,
  );

  for (var i: number = 0; i < array.length; i++) {
    await array[i].drawImage(context);
  }

  return getBase64Image(canvas);
};

function getBase64Image(canvas: nodeCanvas.Canvas): string {
  return canvas.toDataURL();
}

function getManekenBaseBodyParts(
  headUrl?: string,
  bodyUrl?: string,
  trousersUrl?: string,
  footUrl?: string,
): ManekenBaseBodyPart[] {
  const array: ManekenBaseBodyPart[] = [];
  if (trousersUrl) {
    array.push(new ManekenTrousers(trousersUrl));
  }

  if (headUrl) {
    array.push(new ManekenHead(headUrl));
  }

  if (bodyUrl) {
    array.push(new ManekenBody(bodyUrl));
  }

  if (footUrl) {
    array.push(new ManekenFoot(footUrl));
  }

  return array;
}

class ManekenBaseBodyPart {
  height: number;
  positionY: number;
  imageUrl: string;

  constructor(imageUrl: string, positionY: number, height: number) {
    this.imageUrl = imageUrl;
    this.positionY = positionY;
    this.height = height;
  }

  async drawImage(
    context: nodeCanvas.NodeCanvasRenderingContext2D,
  ): Promise<void> {
    const image: nodeCanvas.Image = await nodeCanvas.loadImage(this.imageUrl);
    const aspectRation = image.width / image.height;
    const imageWidth = aspectRation * this.height;
    const positionX = canvasWidth / 2 - imageWidth / 2;

    context.drawImage(
      image,
      positionX,
      this.positionY,
      imageWidth,
      this.height,
    );
  }
}

class ManekenBody extends ManekenBaseBodyPart {
  constructor(imageUrl: string) {
    super(imageUrl, 56, 133);
  }
}

class ManekenTrousers extends ManekenBaseBodyPart {
  constructor(imageUrl: string) {
    super(imageUrl, 156, 176);
  }
}

class ManekenFoot extends ManekenBaseBodyPart {
  constructor(imageUrl: string) {
    super(imageUrl, 332, 38);
  }
}

class ManekenHead extends ManekenBaseBodyPart {
  constructor(imageUrl: string) {
    super(imageUrl, 4, 21);
  }

  async drawImage(
    context: nodeCanvas.NodeCanvasRenderingContext2D,
  ): Promise<void> {
    const image: nodeCanvas.Image = await nodeCanvas.loadImage(this.imageUrl);
    const aspectRatio = image.width / image.height;
    const imageWidth = 33;
    const imageHeight = 33 / aspectRatio;
    const positionX = canvasWidth / 2 - imageWidth / 2;

    context.drawImage(
      image,
      positionX,
      this.positionY,
      imageWidth,
      imageHeight,
    );
  }
}
