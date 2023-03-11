using Domain.Common;

namespace Domain;
public class DateOfBirth : ValueObject
{
    private DateOfBirth(int year, int month, int day)
    {
        Year = year;
        Month = month;
        Day = day;
    }

    public int Year { get; private set; }
    public int Month { get; private set; }
    public int Day { get; private set; }

    protected override IEnumerable<object> GetAtomicValues()
    {
        yield return Year;
        yield return Month;
        yield return Day;
    }

    public static DateOfBirth Create(DateTime date) => new(date.Year, date.Month, date.Day);
}
