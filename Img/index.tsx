type TypeImgProps = { src: string; alt?: string; className?: string };

const Img: React.FC<TypeImgProps> = (options: TypeImgProps): React.ReactElement => {
    const { src, alt = "", className } = options;
    return <img src={src} alt={alt} className={className} />;
};
export default Img;
