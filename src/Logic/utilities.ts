export function FormatPovrsina(Povrsina:number)
{
    let Array1 = Povrsina.toString().split("").reverse();
    let Array2 = Povrsina.toString().split("");
    for(let j = 0 ,i = 0 ; i < Array1.length; i++,j++)
    {
        if(i!=0 && i%3 == 0)
        {
            Array2[j] = ".";
            Array2[j+1] = Array1[i];
            j++;    
        }
        else
            Array2[j] = Array1[i];   
    }
    return Array2.reverse().toString().replace(/,/gi,"")+" km²";
}