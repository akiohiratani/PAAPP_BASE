from flask import Blueprint, jsonify, request
from services.horse_name_search_client import HorseNameSearchClient
from services.horce_client import HorseClient
from services.special_client import SpecialClient
from services.race_client import RaceClient

horses_bp = Blueprint('horses', __name__, url_prefix='/api/horses')

@horses_bp.route('/name', methods=['GET'])
def get_horses_for_name():
    ## http://127.0.0.1:5000/api/horses/name?word=ナミュ
    word = request.args.get('word', '')
    if not word:
        return jsonify({"error": {"status_code": 400, "message": "検索語句を指定してください"}}), 400
    try:
        horse_ids = HorseNameSearchClient().search_horse_ids(word)
        horses = HorseClient().get_horses(horse_ids)
        return jsonify({"data": [h.to_dict() for h in horses]})
    except Exception as e:
        return jsonify({"error": {"status_code": 500, "message": str(e)}}), 500

@horses_bp.route('/race', methods=['GET'])
def get_horses_for_race_id():
    ## http://127.0.0.1:5000/api/horses/race?id=0050
    id = request.args.get('id', '')
    if not id:
        return jsonify({"error": {"status_code": 400, "message": "idを指定してください"}}), 400
    try:
        race_id = SpecialClient().get_race_id(id)
        horse_ids = RaceClient().get_horse_ids(race_id)
        horses = HorseClient().get_horses(horse_ids)
        return jsonify({"data": [h.to_dict() for h in horses ]})
    except Exception as e:
        return jsonify({"error": {"status_code": 500, "message": str(e)}}), 500