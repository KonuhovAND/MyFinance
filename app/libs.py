from datetime import date
from django.core.exceptions import ValidationError


def check_year_month(queryset, year_param, month_param):
    # No filters: return all spending records
    if not year_param and not month_param:
        return queryset

    # Require both values
    if not year_param or not month_param:
        raise ValidationError("Both 'year' and 'month' are required.")

    try:
        year = int(year_param)
        month = int(month_param)

        if month < 0 or month > 12:
            raise ValueError

    except ValueError:
        raise ValidationError(
            "'year' must be a valid year and 'month' must be between 1 and 12."
        )
    return year, month


def end_start_dates(year, month):

    if month == 12:
        start_date = date(year, month, 1)
        end_date = date(year + 1, 1, 1)
    elif month == 0:
        end_date = date(year, month=11, day=30)
        start_date = date(year, month=1, day=1)
    else:
        end_date = date(year, month + 1, 1)
        start_date = date(year, month, 1)

    return start_date, end_date
