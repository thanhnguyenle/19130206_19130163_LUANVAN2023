package fitnlu.ntpos.productservice.adapter.webapi.mapper;

import fitnlu.ntpos.productservice.infrastructure.annotations.Mapper;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;

import java.util.Iterator;

@Mapper
public interface IExcelModelMapper<T, O> {
      T fromExcelRowToModel(Iterator<Cell> cellsInRow);
      void fromModelToExcelRow(T template, Row row, int rowInt);

      T fromModelToExcelModel(O o);
      O fromExcelModelToModel(T t);
}
