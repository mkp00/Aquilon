-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE FUNCTION [dbo].[ufnGetStringForInStatement]
(	
	-- Add the parameters for the function here
	@searchTerm nvarchar(128)
)
RETURNS @Terms TABLE (Term nvarchar(256) NOT NULL)
AS
BEGIN
	INSERT @Terms SELECT '%' + value + '%' AS Term FROM (SELECT value FROM string_split(RTRIM(LTRIM(@searchTerm)), ' ')) splt
	RETURN
END