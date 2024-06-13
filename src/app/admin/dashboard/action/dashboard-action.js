'use server'

export async function GetData(){
    const book_res = await fetch("http://localhost:8000/book");
    if(!res.ok()){
        return undefined;
    }
    const user_res = await fetch("http://localhost:3001/api/readers");
    if(!res.ok()){
        return undefined;
    }
    // const rented_res = await fetch("http://localhost:8000/book");
    // if(!res.ok()){
    //     return undefined;
    // }
    return {
        num_book: book_res.json().length,
        num_user: user_res.json().length,
    };
}