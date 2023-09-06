package fitnlu.ntpos.orderservice.adapter.webapi.excel_service;

import com.itextpdf.text.*;
import com.itextpdf.text.html.WebColors;
import com.itextpdf.text.pdf.*;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NoArgsConstructor;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@NoArgsConstructor
public class PDFGender {
    public BaseFont getCustomFont() throws DocumentException, IOException {
        ClassPathResource resource = new ClassPathResource("sanf.ttf");
        FontFactory.register(resource.getPath());
        Font textFont = FontFactory.getFont("Playfair Display", BaseFont.IDENTITY_H,
                BaseFont.EMBEDDED, 10);
//        Font font = FontFactory.getFont(resource.getPath(), BaseFont.IDENTITY_H, true);
        return textFont.getBaseFont();
    }
    public void generate(HttpServletResponse response) throws DocumentException, IOException {
        Document pdfDoc = new Document(PageSize.A4, 10, 10, 10, 10);
        PdfWriter writer = PdfWriter.getInstance(pdfDoc, response.getOutputStream());
        writer.setPdfVersion(PdfWriter.PDF_VERSION_1_7);

        Font titleFont = FontFactory.getFont("Arial", 12, Font.BOLD);
        Font titleFontBlue = FontFactory.getFont("Arial", 14, Font.NORMAL, BaseColor.BLUE);
        Font boldTableFont = FontFactory.getFont("Arial", 8, Font.BOLD);
        Font bodyFont = FontFactory.getFont("Arial", 8, Font.NORMAL);
        Font emailFont = FontFactory.getFont("Arial", 8, Font.NORMAL, BaseColor.BLUE);
        BaseColor tableHeaderBackgroundColor = WebColors.getRGBColor("#EEEEEE");

        Rectangle pageSize = writer.getPageSize();
        pdfDoc.open();

// Create the header table
        PdfPTable headerTable = new PdfPTable(3);
        headerTable.setHorizontalAlignment(0);
        headerTable.setWidthPercentage(100);
        headerTable.setWidths(new float[] { 100f, 320f, 100f }); // Set column widths
        headerTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);

        ClassPathResource resource = new ClassPathResource("src/main/resources/myimage.png");
        Image logo = Image.getInstance(resource.getPath());
        logo.scaleToFit(100, 15);

        PdfPCell pdfCellLogo = new PdfPCell(logo);
        pdfCellLogo.setBorder(Rectangle.NO_BORDER);
        pdfCellLogo.setBorderColorBottom(BaseColor.BLACK);
        pdfCellLogo.setBorderWidthBottom(1f);
        headerTable.addCell(pdfCellLogo);

        PdfPCell middleCell = new PdfPCell();
        middleCell.setBorder(Rectangle.NO_BORDER);
        middleCell.setBorderColorBottom(BaseColor.BLACK);
        middleCell.setBorderWidthBottom(1f);
        headerTable.addCell(middleCell);

        PdfPTable nestedTable = new PdfPTable(1);
        nestedTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
        PdfPCell nextPostCell1 = new PdfPCell(new Phrase("Company Name", titleFont));
        nextPostCell1.setBorder(Rectangle.NO_BORDER);
        nestedTable.addCell(nextPostCell1);
        PdfPCell nextPostCell2 = new PdfPCell(new Phrase("xxx City Heights, AZ 8xxx4, US,", bodyFont));
        nextPostCell2.setBorder(Rectangle.NO_BORDER);
        nestedTable.addCell(nextPostCell2);
        PdfPCell nextPostCell3 = new PdfPCell(new Phrase("(xxx) xxx-xxx", bodyFont));
        nextPostCell3.setBorder(Rectangle.NO_BORDER);
        nestedTable.addCell(nextPostCell3);
        PdfPCell nextPostCell4 = new PdfPCell(new Phrase("company@example.com", emailFont));
        nextPostCell4.setBorder(Rectangle.NO_BORDER);
        nestedTable.addCell(nextPostCell4);
        nestedTable.addCell("");
        PdfPCell nestHousing = new PdfPCell(nestedTable);
        nestHousing.setBorder(Rectangle.NO_BORDER);
        nestHousing.setBorderColorBottom(BaseColor.BLACK);
        nestHousing.setBorderWidthBottom(1f);
        nestHousing.setRowspan(5);
        nestHousing.setPaddingBottom(10f);
        headerTable.addCell(nestHousing);

        PdfPTable invoiceTable = new PdfPTable(3);
        invoiceTable.setHorizontalAlignment(0);
        invoiceTable.setWidthPercentage(100);
        invoiceTable.setWidths(new float[] { 100f, 320f, 100f }); // Set column widths
        invoiceTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);

        PdfPTable nestedTable2 = new PdfPTable(1);
        nestedTable2.getDefaultCell().setBorder(Rectangle.NO_BORDER);
        PdfPCell nextPostCell1_2 = new PdfPCell(new Phrase("INVOICE TO:", bodyFont));
        nextPostCell1_2.setBorder(Rectangle.NO_BORDER);
        nestedTable2.addCell(nextPostCell1_2);
        PdfPCell nextPostCell2_2 = new PdfPCell(new Phrase("Shivam Srivastava", titleFont));
        nextPostCell2_2.setBorder(Rectangle.NO_BORDER);
        nestedTable2.addCell(nextPostCell2_2);
        PdfPCell nextPostCell3_2 = new PdfPCell(new Phrase("xxx Silver City, TX xxxx, US", bodyFont));
        nextPostCell3_2.setBorder(Rectangle.NO_BORDER);
        nestedTable2.addCell(nextPostCell3_2);
        PdfPCell nextPostCell4_2 = new PdfPCell(new Phrase("shivam@example.com", emailFont));
        nextPostCell4_2.setBorder(Rectangle.NO_BORDER);
        nestedTable2.addCell(nextPostCell4_2);
        nestedTable2.addCell("");
        PdfPCell nestHousing2 = new PdfPCell(nestedTable2);
        nestHousing2.setBorder(Rectangle.NO_BORDER);
        nestHousing2.setRowspan(5);
        nestHousing2.setPaddingBottom(10f);
        invoiceTable.addCell(nestHousing2);

        PdfPCell middleCell2 = new PdfPCell();
        middleCell2.setBorder(Rectangle.NO_BORDER);
        invoiceTable.addCell(middleCell2);

        PdfPTable nestedTable3 = new PdfPTable(1);
        nestedTable3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
        PdfPCell nextPostCell1_3 = new PdfPCell(new Phrase("INVOICE 3-2-1", titleFontBlue));
        nextPostCell1_3.setBorder(Rectangle.NO_BORDER);
        nestedTable3.addCell(nextPostCell1_3);

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();

        PdfPCell nextPostCell2_3 = new PdfPCell(new Phrase("Date of Invoice: " + dtf.format(now), bodyFont));
        nextPostCell2_3.setBorder(Rectangle.NO_BORDER);
        nestedTable3.addCell(nextPostCell2_3);
        PdfPCell nextPostCell3_3 = new PdfPCell(new Phrase("Due Date: " + dtf.format(now), bodyFont));
        nextPostCell3_3.setBorder(Rectangle.NO_BORDER);
        nestedTable3.addCell(nextPostCell3_3);
        nestedTable3.addCell("");
        PdfPCell nestHousing3 = new PdfPCell(nestedTable3);
        nestHousing3.setBorder(Rectangle.NO_BORDER);
        nestHousing3.setRowspan(5);
        nestHousing3.setPaddingBottom(10f);
        invoiceTable.addCell(nestHousing3);

        pdfDoc.add(headerTable);
        invoiceTable.setPaddingTop(10f);
        pdfDoc.add(invoiceTable);

        PdfPTable itemTable = new PdfPTable(5);
        itemTable.setHorizontalAlignment(0);
        itemTable.setWidthPercentage(100);
        itemTable.setWidths(new float[] { 5, 40, 10, 20, 25 }); // Set column widths
        itemTable.setSpacingAfter(40);
        itemTable.getDefaultCell().setBorder(Rectangle.BOX);

        PdfPCell cell1Item = new PdfPCell(new Phrase("NO", boldTableFont));
        cell1Item.setBackgroundColor(tableHeaderBackgroundColor);
        cell1Item.setHorizontalAlignment(Element.ALIGN_CENTER);
        itemTable.addCell(cell1Item);

        PdfPCell cell2Item = new PdfPCell(new Phrase("DESCRIPTION", boldTableFont));
        cell2Item.setBackgroundColor(tableHeaderBackgroundColor);
        cell2Item.setHorizontalAlignment(1);
        itemTable.addCell(cell2Item);

        PdfPCell cell3Item = new PdfPCell(new Phrase("QUANTITY", boldTableFont));
        cell3Item.setBackgroundColor(tableHeaderBackgroundColor);
        cell3Item.setHorizontalAlignment(Element.ALIGN_CENTER);
        itemTable.addCell(cell3Item);

        PdfPCell cell4Item = new PdfPCell(new Phrase("UNIT AMOUNT", boldTableFont));
        cell4Item.setBackgroundColor(tableHeaderBackgroundColor);
        cell4Item.setHorizontalAlignment(Element.ALIGN_CENTER);
        itemTable.addCell(cell4Item);

        PdfPCell cell5Item = new PdfPCell(new Phrase("TOTAL", boldTableFont));
        cell5Item.setBackgroundColor(tableHeaderBackgroundColor);
        cell5Item.setHorizontalAlignment(Element.ALIGN_CENTER);
        itemTable.addCell(cell5Item);

// Populate itemTable with data (similar to your C# code)
        PdfPCell numberCell = new PdfPCell(new Phrase("1", bodyFont));
        numberCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        numberCell.setPaddingLeft(10f);
        numberCell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
        itemTable.addCell(numberCell);

        PdfPCell descCell = new PdfPCell();
        Phrase phrase = new Phrase();
        phrase.add(new Chunk("New Signup Subscription Plan\n", emailFont));
        phrase.add(new Chunk("Subscription Plan description will add here.", bodyFont));
        descCell.addElement(phrase);
        descCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        descCell.setPaddingLeft(10f);
        descCell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
        itemTable.addCell(descCell);

        PdfPCell qtyCell = new PdfPCell(new Phrase("1", bodyFont));
        qtyCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        qtyCell.setPaddingLeft(10f);
        qtyCell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
        itemTable.addCell(qtyCell);

        PdfPCell amountCell = new PdfPCell(new Phrase("$100", bodyFont));
        amountCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        amountCell.setPaddingLeft(10f);
        amountCell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
        itemTable.addCell(amountCell);

        PdfPCell totalAmtCell = new PdfPCell(new Phrase("$100", bodyFont));
        totalAmtCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        totalAmtCell.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
        itemTable.addCell(totalAmtCell);

        PdfPCell cellItem = new PdfPCell(new Phrase("***NOTICE: A finance charge of 1.5% will be made on unpaid balances after 30 days. ***", bodyFont));
        cellItem.setColspan(5);
        cellItem.setHorizontalAlignment(Element.ALIGN_CENTER);
        itemTable.addCell(cellItem);

        pdfDoc.add(itemTable);

        PdfContentByte cb = new PdfContentByte(writer);
        BaseFont bf = BaseFont.createFont(BaseFont.HELVETICA, BaseFont.CP1250, true);
        cb = new PdfContentByte(writer);
        cb = writer.getDirectContent();
        cb.beginText();
        cb.setFontAndSize(bf, 8);
        cb.setTextMatrix(pageSize.getLeft(120), 20);
        cb.showText("Invoice was created on a computer and is valid without the signature and seal. ");
        cb.endText();

        cb.moveTo(40, pdfDoc.getPageSize().getBottom(50));
        cb.lineTo(pdfDoc.getPageSize().getWidth() - 40, pdfDoc.getPageSize().getBottom(50));
        cb.stroke();

        pdfDoc.close();


        }
//
//        // Creating the Object of Document
//        Document document = new Document(PageSize.A4);
//
//        // Getting instance of PdfWriter
//        PdfWriter writer = PdfWriter.getInstance(document, response.getOutputStream());
//        writer.setPdfVersion(PdfWriter.PDF_VERSION_1_7);
//
//        // Opening the created document to modify it
//        document.open();
//        float col  = 280f;
//        float columnWidth[] = {col,col};
//        PdfPTable table = new PdfPTable(columnWidth);
//
////        table.setBackgroundColor(deviceRgb).setFontColor(ColorConstants.WHITE);
//        PdfPCell pdfPCell_title = new PdfPCell();
//        Paragraph pdfPCell_title_para = new Paragraph("NTPOS");
//        pdfPCell_title_para.setAlignment(Element.ALIGN_CENTER);
//        pdfPCell_title_para.setFont(new Font(getCustomFont(), 50f, Font.NORMAL, BaseColor.CYAN));
//        pdfPCell_title.setPhrase(pdfPCell_title_para);
//        pdfPCell_title.setVerticalAlignment(Element.ALIGN_CENTER);
////        pdfPCell_title.setMarginTop(30f).setMarginBottom(30f)
//        pdfPCell_title.setBorder(Rectangle.NO_BORDER);
//        table.addCell(pdfPCell_title);
//
//        PdfPCell pdfPCell_info = new PdfPCell();
//        pdfPCell_info.setPhrase(new Paragraph("Địa chỉ: Khu phố 6, phường Linh Trung, TP.Thủ Đức, TP.HCM\nMobile: 0931182688\nEmail: forenamethanh@gmail.com"));
//        pdfPCell_info.setVerticalAlignment(Element.ALIGN_MIDDLE);
////        pdfPCell_title.setMarginTop(30f).setMarginBottom(30f)
//        pdfPCell_info.setBorder(Rectangle.NO_BORDER);
//        table.addCell(pdfPCell_info);
//
//        float colWidth [] = {80,300,100,80};
//        PdfPTable customerInfoTable = new PdfPTable(colWidth);
//
//        //customer information
//        PdfPCell customer_info = new PdfPCell();
//        Paragraph paragraph_ci_title = new Paragraph("Thông tin khách hàng");
//        paragraph_ci_title.setFont(new Font(getCustomFont(), 30f, Font.BOLD, BaseColor.CYAN));
//        customer_info.setPhrase(paragraph_ci_title);
//        customer_info.setBorder(Rectangle.NO_BORDER);
//        customerInfoTable.addCell(customer_info);
//
//        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
//        LocalDateTime now = LocalDateTime.now();
//        String[] customer_info_data = new String[]{"Họ và tên:", "....","Invoice No:","....","Số điện thoại:" ,"....","Ngày xuất hóa đơn:",dtf.format(now)};
//        for(String cus: customer_info_data){
//            PdfPCell customer_info_cus = new PdfPCell();
//            Paragraph paragraph_ci_title__cus = new Paragraph(cus);
//            paragraph_ci_title__cus.setFont(new Font(getCustomFont(), 30f, Font.BOLD, BaseColor.CYAN));
//            customer_info_cus.setPhrase(paragraph_ci_title__cus);
//            customer_info_cus.setBorder(Rectangle.NO_BORDER);
//            customerInfoTable.addCell(customer_info_cus);
//        }
//
//        float itemInfoColWidth[] = {140,140,140,140};
//        PdfPTable itemInfoTable = new PdfPTable(itemInfoColWidth);
//
//        //header
//        String[] header_table = new String[]{"Sản phẩm","Ưu đãi","Số lượng" ,"Giá sản phẩm"};
//        for(String cus: header_table){
//            PdfPCell customer_info_cus = new PdfPCell();
//            Paragraph paragraph_ci_title__cus = new Paragraph(cus);
//            paragraph_ci_title__cus.setFont(new Font(getCustomFont(), 30f, Font.BOLD, BaseColor.CYAN));
//            paragraph_ci_title__cus.setAlignment(Element.ALIGN_MIDDLE);
//            customer_info_cus.setPhrase(paragraph_ci_title__cus);
//            customer_info_cus.setBorder(Rectangle.NO_BORDER);
//            customerInfoTable.addCell(customer_info_cus);
//        }
////        //header
////        itemInfoTable.addCell(new Cell().add(new Paragraph("Product").setBold()).setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE));
////        itemInfoTable.addCell(new Cell().add(new Paragraph("Topping").setBold()).setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE));
////        itemInfoTable.addCell(new Cell().add(new Paragraph("Amount").setBold()).setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE));
////        itemInfoTable.addCell(new Cell().add(new Paragraph("Unit Price ($)").setBold()).setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE));
////
////        //items
////        double totalPrice = 0;
////        for(Map.Entry<String, Product> entry :orders.getProductList().entrySet()){
////            itemInfoTable.addCell(new Cell().add(new Paragraph(entry.getValue().getName())).setTextAlignment(TextAlignment.LEFT).setVerticalAlignment(VerticalAlignment.MIDDLE));
////            itemInfoTable.addCell(new Cell().add(new Paragraph("No")).setTextAlignment(TextAlignment.LEFT).setVerticalAlignment(VerticalAlignment.MIDDLE));
////            itemInfoTable.addCell(new Cell().add(new Paragraph(entry.getValue().getQuantitySold()+"")).setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE));
////            double price = Math.round((entry.getValue().getPrice() - entry.getValue().getDiscount())*100)/100.0* entry.getValue().getQuantitySold();
////            itemInfoTable.addCell(new Cell().add(new Paragraph(price+"")).setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE));
////            totalPrice+=price;
////        }
////
////        itemInfoTable.addCell(new Cell().add(new Paragraph("")).setBackgroundColor(deviceRgb).setBorder(Border.NO_BORDER));
////        itemInfoTable.addCell(new Cell().add(new Paragraph("")).setBackgroundColor(deviceRgb).setBorder(Border.NO_BORDER));
////        itemInfoTable.addCell(new Cell().add(new Paragraph("Total Amount")).setBold().setTextAlignment(TextAlignment.RIGHT).setBackgroundColor(deviceRgb).setBorder(Border.NO_BORDER));
////        itemInfoTable.addCell(new Cell().add(new Paragraph(totalPrice+"")).setTextAlignment(TextAlignment.CENTER).setBackgroundColor(deviceRgb).setBorder(Border.NO_BORDER));
//        document.add(table);
//        document.add(new Paragraph("\n"));
//        document.add(customerInfoTable);
////        document.add(new Paragraph("\n"));
////        document.add(itemInfoTable);
//        document.close();
//        System.out.println("PDF CREATED");
////        return true;
    }
//    public boolean generatePDF(Account account,Orders orders,HttpServletRequest request) {
//        File file = getResourceFile(request);
//        DeviceRgb deviceRgb = new DeviceRgb(63,169,219);
//        try {
//            PdfWriter pdfWriter = new PdfWriter(file);
//            PdfDocument pdfDocument = new PdfDocument(pdfWriter);
//            Document document = new Document(pdfDocument);
//            pdfDocument.setDefaultPageSize(PageSize.A4);
//
//            float col  = 280f;
//            float columnWidth[] = {col,col};
//            Table table = new Table(columnWidth);
//
//            table.setBackgroundColor(deviceRgb).setFontColor(ColorConstants.WHITE);
//
//            table.addCell(new Cell().add(new Paragraph("INVOICE")).setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE).setMarginTop(30f).setMarginBottom(30f).setFontSize(30f).setBorder(Border.NO_BORDER));
//            table.addCell(new Cell().add(new Paragraph("THE STARBUCK\nNong Lam University\n0123456789")).setTextAlignment(TextAlignment.LEFT).setVerticalAlignment(VerticalAlignment.MIDDLE).setMarginTop(30f).setMarginBottom(30f).setFontSize(10f).setBorder(Border.NO_BORDER));;
//
//            float colWidth [] = {80,300,100,80};
//            Table customerInfoTable = new Table(colWidth);
//            customerInfoTable.addCell(new Cell(0,4).add(new Paragraph("Customer Information").setBold()).setBorder(Border.NO_BORDER));
//
//            customerInfoTable.addCell(new Cell().add(new Paragraph("Name:")).setBorder(Border.NO_BORDER));
//            customerInfoTable.addCell(new Cell().add(new Paragraph(account.getFullname())).setBorder(Border.NO_BORDER));
//            customerInfoTable.addCell(new Cell().add(new Paragraph("Invoice No:")).setBorder(Border.NO_BORDER));
//            customerInfoTable.addCell(new Cell().add(new Paragraph(orders.getId())).setBorder(Border.NO_BORDER));
//
//            customerInfoTable.addCell(new Cell().add(new Paragraph("Mobile:")).setBorder(Border.NO_BORDER));
//            customerInfoTable.addCell(new Cell().add(new Paragraph(account.getPhoneNumber())).setBorder(Border.NO_BORDER));
//            customerInfoTable.addCell(new Cell().add(new Paragraph("Date:")).setBorder(Border.NO_BORDER));
//            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
//            LocalDateTime now = LocalDateTime.now();
//            customerInfoTable.addCell(new Cell().add(new Paragraph(dtf.format(now))).setBorder(Border.NO_BORDER));
//
//            float itemInfoColWidth[] = {140,140,140,140};
//            Table itemInfoTable = new Table(itemInfoColWidth);
//
//            //header
//            itemInfoTable.addCell(new Cell().add(new Paragraph("Product").setBold()).setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE));
//            itemInfoTable.addCell(new Cell().add(new Paragraph("Topping").setBold()).setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE));
//            itemInfoTable.addCell(new Cell().add(new Paragraph("Amount").setBold()).setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE));
//            itemInfoTable.addCell(new Cell().add(new Paragraph("Unit Price ($)").setBold()).setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE));
//
//            //items
//            double totalPrice = 0;
//            for(Map.Entry<String, Product> entry :orders.getProductList().entrySet()){
//                itemInfoTable.addCell(new Cell().add(new Paragraph(entry.getValue().getName())).setTextAlignment(TextAlignment.LEFT).setVerticalAlignment(VerticalAlignment.MIDDLE));
//                itemInfoTable.addCell(new Cell().add(new Paragraph("No")).setTextAlignment(TextAlignment.LEFT).setVerticalAlignment(VerticalAlignment.MIDDLE));
//                itemInfoTable.addCell(new Cell().add(new Paragraph(entry.getValue().getQuantitySold()+"")).setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE));
//                double price = Math.round((entry.getValue().getPrice() - entry.getValue().getDiscount())*100)/100.0* entry.getValue().getQuantitySold();
//                itemInfoTable.addCell(new Cell().add(new Paragraph(price+"")).setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE));
//                totalPrice+=price;
//            }
//
//            itemInfoTable.addCell(new Cell().add(new Paragraph("")).setBackgroundColor(deviceRgb).setBorder(Border.NO_BORDER));
//            itemInfoTable.addCell(new Cell().add(new Paragraph("")).setBackgroundColor(deviceRgb).setBorder(Border.NO_BORDER));
//            itemInfoTable.addCell(new Cell().add(new Paragraph("Total Amount")).setBold().setTextAlignment(TextAlignment.RIGHT).setBackgroundColor(deviceRgb).setBorder(Border.NO_BORDER));
//            itemInfoTable.addCell(new Cell().add(new Paragraph(totalPrice+"")).setTextAlignment(TextAlignment.CENTER).setBackgroundColor(deviceRgb).setBorder(Border.NO_BORDER));
//            document.add(table);
//            document.add(new Paragraph("\n"));
//            document.add(customerInfoTable);
//            document.add(new Paragraph("\n"));
//            document.add(itemInfoTable);
//            document.close();
//            System.out.println("PDF CREATED");
//            return true;
//        } catch (FileNotFoundException e) {
//            return false;
//        }
//
//    }
//}
