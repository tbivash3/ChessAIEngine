export class Constants {

    static BOX_COLOR_ONE = "#eeeed2";

    static BOX_COLOR_TWO = "#769656";

    static PIECE_COLOR_BLACK = 'B';

    static PIECE_COLOR_WHITE = 'W';

    static PLAYER_TURN_TEXT = "YOUR TURN";

    static PLAYER_ONE = 'B';

    static PLAYER_TWO = 'W';

    static BLACK_KING_INITIAL_INDEX = 4;

    static WHTE_KING_INITIAL_INDEX = 60;

    static ROOK = "R";

    static KNIGHT = "K";

    static BISHOP = "B";

    static KING = "KG";

    static QUEEN = "Q";

    static PAWN = "P";

    static ROOK_START_INDEX = [0, 0];

    static KNIGHT_START_INDEX = [2, 2];

    static BISHOP_START_INDEX = [4, 4];

    static KING_START_INDEX = [6, 6];

    static QUEEN_START_INDEX = [7, 7];

    static PAWN_START_INDEX = [8, 8];

    static getPiecesStartIndex() {
        let map: Map<String, number[]> = new Map();

        map.set(Constants.ROOK, Constants.ROOK_START_INDEX);
        map.set(Constants.KNIGHT, Constants.KNIGHT_START_INDEX);
        map.set(Constants.BISHOP, Constants.BISHOP_START_INDEX);
        map.set(Constants.KING, Constants.KING_START_INDEX);
        map.set(Constants.QUEEN, Constants.QUEEN_START_INDEX);
        map.set(Constants.PAWN, Constants.PAWN_START_INDEX);

        return map;
    }
}