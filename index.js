const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.get("/",async(req,res)=>{
    res.send("Hii from backend");
})

app.get('/generator-pdf',(req,res)=>{
    const responseData = {
        name: 'Abhimanyu Kumar',
        email: 'abhi@gmail.com',
        age: 20,
        hobbies: ['Cricket', 'Coding'],
        bio: 'A software developer passionate about building scalable applications.'
    };

 // Create a new PDF document
 const doc = new PDFDocument();


// Set the response headers to send the PDF
 res.setHeader('Content-Type', 'application/pdf');
 res.setHeader('Content-Disposition', 'attachment; filename=response.pdf');


 // Pipe the PDF document to the response
  doc.pipe(res);

    // Add content to the PDF
    doc.fontSize(18).text('Response Data PDF', { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text(`Name: ${responseData.name}`);
    doc.text(`Email: ${responseData.email}`);
    doc.text(`Age: ${responseData.age}`);
    doc.moveDown();

    doc.text('Hobbies:');
    responseData.hobbies.forEach((hobby, index) => {
        doc.text(`- ${hobby}`, { indent: 20 });
    });

    doc.moveDown();
    doc.text('Bio:');
    doc.text(responseData.bio, { indent: 20 });

    // Finalize the PDF and end the stream
    doc.end();
});

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
})
