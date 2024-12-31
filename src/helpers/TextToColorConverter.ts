export abstract class TextToColorConverter{
    public static convert(text: string): string {
        let hash = 0;

        text
            .split('')
            .forEach(char => hash = char.charCodeAt(0) + ((hash << 7) - hash))

        let color = '#'

        for (let i = 0; i < 3; i++) {
          const value = (hash >> (i * 8)) & 0xff
          color += value.toString(16).padStart(2, '0')
        }

        return color
    }
}